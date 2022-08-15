import { Injectable } from '@angular/core';
import { map, Observable, SubscriptionLike } from 'rxjs';
import { CryptoData, localStorageGetItem, localStorageSetItem } from '../../../utils/localStorage';
import { Collection } from '../../../utils/collection';
import {
  ICard,
  ICardByStep,
  IConsultation,
  ELocalStorage,
  IStep,
  IConsultationStorage,
  ECardType,
} from '../../api/models';
import { fullUnsubscribe } from '../../../utils';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService extends Collection<IConsultation> {
  private dataSub: SubscriptionLike[] = [];
  private _paymentId: string;
  private crypto = new CryptoData(ELocalStorage.consultation);

  get currentStepId$(): Observable<number> {
    return this.data$.pipe(map(d => d?.currentStep?.id));
  }

  get uuid(): string {
    return this.data?.uuid;
  }

  get consultations(): IConsultationStorage {
    const data = localStorageGetItem(ELocalStorage.consultation, this.crypto);
    return !!data ? JSON.parse(data) : null;
  }

  get lastConsultation(): IConsultation {
    const cs = !!this.consultations && Object.keys(this.consultations).map(key => this.consultations[key]).sort((a, b) => a.time - b.time);
    return cs[cs.length - 1];
  }

  get selectedCards(): ICard[] {
    return this.data?.log.map(c => c.card);
  }

  private dataEmit(step: IStep, log?: ICardByStep): void {
    this.data = {
      uuid: this.uuid,
      currentStep: step,
      log: log ? [...this.data?.log, log] : this.data?.log,
      time: new Date().getTime(),
    };
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    let data = { [this.data.uuid]: this.data };
    if (this.consultations) {
      data = { ...this.consultations, ...data };
    }
    localStorageSetItem(ELocalStorage.consultation, JSON.stringify(data), this.crypto);
  }

  public isStepCompleted(step: IStep): boolean {
    return this.data?.currentStep?.id >= step.id;
  }

  public nextStepHandler(nextStep: IStep): void {
    this.dataEmit(nextStep);
  }

  public selectCardHandler(card: ICard, type: ECardType): void {
    this.dataEmit(this.data.currentStep, { step: this.data.currentStep, card: { ...card, type } });
  }

  init(paymentId: string): void {
    this._paymentId = paymentId;
    this.data = this.consultations?.hasOwnProperty(paymentId) ? this.consultations[paymentId] : {
      uuid: paymentId,
      currentStep: {} as IStep,
      log: [],
      time: new Date().getTime(),
    };
  }

  destroy(): void {
    fullUnsubscribe(this.dataSub);
    this.data = {} as IConsultation;
    this._paymentId = '';
  }

  constructor() {
    super();
  }
}
