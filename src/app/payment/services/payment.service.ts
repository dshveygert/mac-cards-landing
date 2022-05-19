import { Injectable } from '@angular/core';
import {catchError, filter, Observable, of, SubscriptionLike, tap} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import {fullUnsubscribe, generateMagicPayment} from '../../../utils';
import {Collection} from "../../../utils/collection";
import {SettingsService} from "../../routing/services/settings.service";
import {PaymentApi} from "../../api/methods";
import {
  CryptoData,
  localStorageGetItem,
  localStorageRemoveItem,
  localStorageSetItem
} from "../../../utils/localStorage";
import {ELocalStorage, IPayment, IPaymentLocalData, IPaymentResponse} from "../../api/models";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class PaymentService extends Collection<IPayment> {
  public crypto = new CryptoData(ELocalStorage.payment_key);
  private dataSub: SubscriptionLike[] = [];
  private _keyCreatedAt = 1;
  private key = '';
  private periodMS = environment.api.payment_create_period ?? 3600000; //ms

  get paymentRedirectUrl(): string {
    return (this.data?.confirmation && this.data.confirmation.confirmation_url) ?? '';
  }

  get createUUID(): string {
    const now = new Date().getTime();
    if (now - this._keyCreatedAt > this.periodMS) {
      this._keyCreatedAt = now;
      return uuidv4() + '-mac';
    } else {
      return this.key;
    }
  }

  get pendingPayment(): IPaymentLocalData {
    const localKey = JSON.parse(localStorageGetItem(ELocalStorage.payment_key, this.crypto) ?? '');
    return !!localKey && localKey.key && localKey;
  }

  private paymentEmit(data: IPaymentResponse): void {
    this.data = data.payment ?? {};
    if (this.data?.status === 'succeeded') {
      const paymentKey: IPaymentLocalData = {
        key: JSON.parse(localStorageGetItem(ELocalStorage.payment_key, this.crypto) ?? '{}')?.key === this.key ? this.key : '', // if payment is checking directly from url (not after payment creation)
        paymentId: this.data.id,
        status: this.data?.status
      };
      localStorageSetItem(ELocalStorage.payment_key, JSON.stringify(paymentKey), this.crypto);
      this.router.navigate([`/consultation/${this.data.id}/preparation`]).then();
    }
  }

  public clearPendingPayment(): void {
    localStorageRemoveItem(ELocalStorage.payment_key);
  }

  public createPayment = (): Observable<IPaymentResponse> =>  {
    this.key = this.createUUID;
    return this.api.paymentCreate(this.key);
  }

  public checkPaymentStatus = (paymentId: string): Observable<IPaymentResponse> => {
    if (paymentId === environment.magic_uuid) {
      console.log('MAGIC! Payment');
      const payment = generateMagicPayment(paymentId, 'succeeded');
      this.paymentEmit(payment);
      return of(payment);
    }
    return this.api.paymentStatus(paymentId).pipe(tap(d => {
      this.paymentEmit(d);
    }), catchError(e => {
      console.log('error', e.status, e.message, e.url);
      return of({} as IPaymentResponse);
    }));
  }

  public redirectToPaymentPage(url: string): void {
    !!window && window.open(url, '_blank');
  }

  init(): void {
    this.dataSub.push(this.createPayment().pipe(filter(d => !!d && !!d.payment?.id), tap(d => {
      if (d.message === 'success') {
        this.data = d.payment;
        const {id, status} = d.payment;
        const paymentKey: IPaymentLocalData = {key: this.key, paymentId: id, status};
        localStorageSetItem(ELocalStorage.payment_key, JSON.stringify(paymentKey), this.crypto);
        d.payment?.confirmation && this.redirectToPaymentPage(d.payment.confirmation.confirmation_url);
        this.router.navigate([`/payment/${id}`]).then();
      }
    })).subscribe());
  }

  destroy(): void {
    fullUnsubscribe(this.dataSub);
    this.data = {} as any;
  }


  constructor(private api: PaymentApi, private settings: SettingsService, private router: Router) {
    super();
  }
}
