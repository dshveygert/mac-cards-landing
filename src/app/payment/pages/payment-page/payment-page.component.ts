import {AfterViewInit, Component} from '@angular/core';
import {PaymentService} from "../../services/payment.service";

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.sass']
})
export class PaymentPageComponent implements AfterViewInit {


  ngAfterViewInit(): void {
    setTimeout(() => this.payment.init(), 3000);
  }

  constructor(private payment: PaymentService) { }

}
