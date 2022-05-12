import { Injectable } from '@angular/core';
import {map, Observable, SubscriptionLike} from 'rxjs';
import {CryptoData, localStorageGetItem, localStorageSetItem} from '../../../utils/localStorage';
import {Collection} from "../../../utils/collection";
import {IPreparation, ELocalStorage, IPreparationAnswer} from "../../api/models";
import {fullUnsubscribe} from "../../../utils";

@Injectable({
  providedIn: 'root'
})
export class PreparationService extends Collection<IPreparation[]> {
  private dataSub: SubscriptionLike[] = [];
  private uuid: string;
  private crypto = new CryptoData(ELocalStorage.preparation);

  private dataEmit(answer: IPreparationAnswer): void {
    const preparation: IPreparation = {
      uuid: this.uuid,
      answer
    };
    const index = this.data?.findIndex(item => item.uuid === this.uuid && item.answer?.form_code === answer.form_code);
    if (index >= 0) {
      this.data[index] = preparation;
    } else {
      this.data = [...this.data, preparation];
    }
    localStorageSetItem(ELocalStorage.preparation, JSON.stringify(this.data), this.crypto);
  }

  answerByFormCode$(code: string): Observable<IPreparationAnswer | undefined> {
    return this.data$.pipe(map(d => d?.find(item => item.uuid === this.uuid && item.answer?.form_code === code)?.answer));
  }

  saveAnswer(answer: IPreparationAnswer): void {
    return this.dataEmit(answer);
  }

  init(consultationSession: string): void {
    this.uuid = consultationSession;
    const preparation = localStorageGetItem(ELocalStorage.preparation, this.crypto);
    this.data = preparation ? JSON.parse(preparation) : [];
  }

  destroy(): void {
    fullUnsubscribe(this.dataSub);
    this.uuid = '';
  }

  constructor() {
    super();
  }
}
