import { Injectable } from '@angular/core';
import { map, Observable, SubscriptionLike, take } from 'rxjs';
import { CryptoData, localStorageGetItem, localStorageSetItem } from '../../../utils/localStorage';
import { Collection } from '../../../utils/collection';
import { IPreparation, ELocalStorage, IPreparationAnswer, TAnswerType } from '../../api/models';
import { fullUnsubscribe } from '../../../utils';
import { SaveAnswersService } from '../../shared/services/save-answers.service';
import { PaymentService } from '../../payment/services/payment.service';

@Injectable({
  providedIn: 'root',
})
export class PreparationService extends Collection<IPreparation[]> {
  private dataSub: SubscriptionLike[] = [];
  private _paymentId: string;
  private crypto = new CryptoData(ELocalStorage.preparation);

  private dataEmit(answer: IPreparationAnswer): void {
    const preparation: IPreparation = {
      uuid: this._paymentId,
      answer,
    };
    const index = this.data?.findIndex(item => item.uuid === this._paymentId && item.answer?.form_code === answer.form_code);
    if (index >= 0) {
      this.data[index] = preparation;
    } else {
      this.data = [...this.data, preparation];
    }
    localStorageSetItem(ELocalStorage.preparation, JSON.stringify(this.data), this.crypto);
  }

  public answerByFormCode$(code: string): Observable<IPreparationAnswer | undefined> {
    return this.data$.pipe(map(d => d?.find(item => item.uuid === this._paymentId && item.answer?.form_code === code)?.answer));
  }

  public saveAnswer(answer: IPreparationAnswer): void {
    return this.dataEmit(answer);
  }

  public saveAnswerInDB(type: TAnswerType): void {
    const key = localStorageGetItem(ELocalStorage.payment_key, this.payment.crypto);
    const preparation = localStorageGetItem(ELocalStorage.preparation, this.crypto);
    if (!!preparation) {
      this.dataSub.push(this.db.saveData(this._paymentId, JSON.parse(preparation)?.filter((d: IPreparation) => d.uuid === this._paymentId), type, !!key && JSON.parse(key)?.key).pipe(take(1)).subscribe());
    }
  }

  public saveMainAnswerInDB(): void {
    const key = localStorageGetItem(ELocalStorage.payment_key, this.payment.crypto);
    const preparation = localStorageGetItem(ELocalStorage.preparation, this.crypto);
    if (!!preparation) {
      const answer = JSON.parse(preparation)?.filter((d: IPreparation) => d.uuid === this._paymentId && d.answer.form_code === 'final-question-form');
      this.dataSub.push(this.db.saveData(this._paymentId, answer, 'main-question', !!key && JSON.parse(key)?.key).pipe(take(1)).subscribe());
    }
  }

  public init(paymentId: string): void {
    this._paymentId = paymentId;
    const preparation = localStorageGetItem(ELocalStorage.preparation, this.crypto);
    this.data = !!preparation ? JSON.parse(preparation) : [];
  }

  public destroy(): void {
    fullUnsubscribe(this.dataSub);
    this._paymentId = '';
  }

  constructor(private db: SaveAnswersService, private payment: PaymentService) {
    super();
  }
}
