import { Injectable } from '@angular/core';
import {map, Observable, SubscriptionLike} from 'rxjs';
import {CryptoData, localStorageGetItem, localStorageSetItem} from '../../../utils/localStorage';
import {Collection} from "../../../utils/collection";
import {ICard, ICardByStep, IConsultation, ELocalStorage, IStep, IConsultationStorage} from "../../api/models";
import {fullUnsubscribe} from "../../../utils";

@Injectable({
  providedIn: 'root'
})
export class ConsultationService extends Collection<IConsultation> {
  private dataSub: SubscriptionLike[] = [];
  private crypto = new CryptoData(ELocalStorage.consultation);

  get currentStepId$(): Observable<number> {
    return this.data$.pipe(map(d => d?.currentStep?.id));
  }

  get uuid(): string {
    return this.data?.uuid;
  }

  get consultations(): IConsultationStorage {
    const data = localStorageGetItem(ELocalStorage.consultation, this.crypto);
    return !!data ? JSON.parse(data) : null
  }

  isStepCompleted(step: IStep): boolean {
    return this.data?.currentStep?.id >= step.id;
  }

  private dataEmit(step: IStep, log?: ICardByStep): void {
    this.data = {
      uuid: this.uuid,
      currentStep: step,
      log: log ? [...this.data?.log, log] : this.data?.log
    };
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    let data = {[this.data.uuid]: this.data};
    if (this.consultations) {
      data = {...this.consultations, ...data};
    }
    localStorageSetItem(ELocalStorage.consultation, JSON.stringify(data), this.crypto);
  }

  nextStepHandler(nextStep: IStep): void {
    this.dataEmit(nextStep);
  }

  selectedCardHandler(card: ICard): void {
    this.dataEmit(this.data.currentStep, {step: this.data.currentStep, card});
  }

  init(consultationSession: string): void {
    // @ts-ignore
    this.data = this.consultations?.hasOwnProperty(consultationSession) ? this.consultations[consultationSession] : {
      uuid: consultationSession,
      currentStep: -1,
      log: []
    };
  }

  destroy(): void {
    fullUnsubscribe(this.dataSub);
    this.data = {} as IConsultation;
  }

  constructor() {
    super();
  }
}
