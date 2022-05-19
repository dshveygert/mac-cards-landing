import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SubscriptionLike, interval, switchMap, ReplaySubject, Observable, startWith, of, take, map} from "rxjs";
import {fullUnsubscribe} from "../../../../utils";
import {PaymentService} from "../../services/payment.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-payment-status-page',
  templateUrl: './payment-status-page.component.html',
  styleUrls: ['./payment-status-page.component.sass']
})
export class PaymentStatusPageComponent implements OnInit, OnDestroy {
  private dataSub: SubscriptionLike[] = [];
  private _counter = 1;
  private _counter$ = new ReplaySubject<number>();
  private _paymentID: string;

  get counter$(): Observable<number> {
    return this._counter$.pipe(startWith(this._counter));
  }
  set counter(n: number) {
    this._counter = n;
    this._counter$.next(this._counter);
  }

  get isPending$(): Observable<boolean> {
    return this.payment.data$.pipe(map(d => d.status === 'pending'));
  }

  get afterAttempts(): number {
    return environment.api.payment_status_attempts;
  }

  public pay(): void {
    this.payment.redirectToPaymentPage(this.payment.paymentRedirectUrl);
  }

  ngOnInit(): void {
    // this.dataSub.push(this.route.params.pipe(switchMap(({paymentId}) => {
    //   this.counter = 1;
    //   return interval(environment.api.payment_status_pending).pipe(switchMap(() => {
    //     if (this._counter > environment.api.payment_status_attempts || (!!this.payment.data && this.payment.data.status !== 'pending')) {
    //       fullUnsubscribe(this.dataSub);
    //       return of({});
    //     } else {
    //       this.counter = this._counter + 1;
    //       return this.payment.checkPaymentStatus(paymentId);
    //     }
    //   }));
    // })).subscribe());
    // this.dataSub.push(this.route.params.pipe(switchMap(({paymentId}) => {
    //   return this.payment.checkPaymentStatus(paymentId);
    // }), take(1)).subscribe());

    this.dataSub.push(this.route.params.pipe(switchMap(({paymentId}) => {
      this._paymentID = paymentId;
      return this.payment.checkPaymentStatus(paymentId);
    }), switchMap(() => {
      this.counter = 1;
      return interval(environment.api.payment_status_pending).pipe(switchMap(() => {
        if (this._counter > environment.api.payment_status_attempts || (!!this.payment.data && this.payment.data.status !== 'pending')) {
          fullUnsubscribe(this.dataSub);
          return of({});
        } else {
          this.counter = this._counter + 1;
          return this.payment.checkPaymentStatus(this._paymentID);
        }
      }));
    })).subscribe());
  }

  ngOnDestroy(): void {
    fullUnsubscribe(this.dataSub);
  }

  constructor(private route: ActivatedRoute, public payment: PaymentService) { }

}
