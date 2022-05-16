import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {PaymentService} from "../../services/payment.service";

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.sass']
})
export class PaymentPageComponent implements OnInit, OnDestroy, AfterViewInit {


  ngAfterViewInit(): void {
    this.payment.init();
  }

  ngOnInit(): void {
  }



  ngOnDestroy(): void {
  }

  constructor(private payment: PaymentService) { }

}
