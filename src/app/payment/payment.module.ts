import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PaymentLayoutPageComponent } from './pages/payment-layout-page/payment-layout-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { PaymentStatusPageComponent } from './pages/payment-status-page/payment-status-page.component';
import { PaymentBackPageComponent } from './pages/payment-back-page/payment-back-page.component';

const components = [PaymentLayoutPageComponent, PaymentPageComponent, PaymentStatusPageComponent, PaymentBackPageComponent];
const routes: Routes = [
  {
    path: '', component: PaymentLayoutPageComponent, children: [
      { path: '', component: PaymentPageComponent, pathMatch: 'full' },
      { path: 'back/:paymentKey', component: PaymentBackPageComponent },
      { path: ':paymentId', component: PaymentStatusPageComponent },
    ],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: components,
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class PaymentModule {
}
