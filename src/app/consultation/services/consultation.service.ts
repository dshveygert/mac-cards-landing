import { Injectable } from '@angular/core';
import {map, Observable, SubscriptionLike} from 'rxjs';
import {localStorageGetItem, localStorageSetItem} from '../../../utils/localStorage';
import {Collection} from "../../../utils/collection";
import {ICard, ICardByStep, IConsultation, ILocalStorage, IStep} from "../../api/models";
import {fullUnsubscribe} from "../../../utils";

@Injectable({
  providedIn: 'root'
})
export class ConsultationService extends Collection<IConsultation> {
  private stepsNumber = 4;
  private dataSub: SubscriptionLike[] = [];
  private consultationSession: string;

  get currentStepId$(): Observable<number> {
    return this.data$.pipe(map(d => d?.currentStep?.id));
  }

  isStepCompleted(step: IStep): boolean {
    return this.data?.currentStep?.id >= step.id;
  }

  private dataEmit(step: IStep, log?: ICardByStep): void {
    const consultation: IConsultation = {
      uuid: this.consultationSession,
      currentStep: step,
      log: log ? [...this.data?.log, log] : this.data?.log
    };
    localStorageSetItem(ILocalStorage.consultation, JSON.stringify(consultation));
    this.data = consultation;
  }

  nextStepHandler(nextStep: IStep): void {
    this.dataEmit(nextStep);
  }

  selectedCardHandler(card: ICard): void {
    this.dataEmit(this.data.currentStep, {step: this.data.currentStep, card});
  }

  init(consultationSession: string): void {
    this.consultationSession = consultationSession;
    const consultation = localStorageGetItem(ILocalStorage.consultation);
    const localData = consultation ? JSON.parse(consultation) : {};
    this.data = localData?.uuid === consultationSession ? localData : {
      uuid: consultationSession,
      currentStep: -1,
      log: []
    };
  }

  destroy(): void {
    fullUnsubscribe(this.dataSub);
  }

  constructor() {
    super();
  }
}
