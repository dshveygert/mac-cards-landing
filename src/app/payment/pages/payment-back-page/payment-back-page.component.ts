import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike, tap } from 'rxjs';
import { fullUnsubscribe } from '../../../../utils';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-back-page',
  templateUrl: './payment-back-page.component.html',
  styleUrls: ['./payment-back-page.component.sass'],
})
export class PaymentBackPageComponent implements OnInit {
  private dataSub: SubscriptionLike[] = [];

  ngOnInit(): void {
    this.dataSub.push(this.route.params.pipe(tap(({ paymentKey }) => {
      if (!!paymentKey && paymentKey === this.payment.pendingPayment?.key) {
        this.router.navigate([`/payment/${this.payment.pendingPayment.paymentId}`]).then();
        this.payment.clearPendingPayment();
      } else {
        this.router.navigate([`/payment`]).then();
      }
    })).subscribe());
  }

  ngOnDestroy(): void {
    fullUnsubscribe(this.dataSub);
  }

  constructor(private route: ActivatedRoute, private payment: PaymentService, private router: Router) {
  }

}
