import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PaymentApi } from './methods';

const api = [PaymentApi];

@NgModule({
  imports: [HttpClientModule],
  providers: [...api]
})
export class ApiModule {
}
