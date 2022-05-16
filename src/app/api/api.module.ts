import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ConsultationApi, PaymentApi } from './methods';

const api = [PaymentApi, ConsultationApi];

@NgModule({
  imports: [HttpClientModule],
  providers: [...api]
})
export class ApiModule {
}
