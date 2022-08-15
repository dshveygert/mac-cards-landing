import { NgModule } from '@angular/core';
import { MetrikaModule } from 'ng-yandex-metrika';
import {NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule} from "ngx-google-analytics";
import {environment} from "../../environments/environment";

const modules = [
  NgxGoogleAnalyticsModule.forRoot(environment.analytics.ga),
  NgxGoogleAnalyticsRouterModule,
  MetrikaModule.forRoot(
    { id: environment.analytics.yaMetrika, webvisor: false }
  )
];

@NgModule({
  imports: [...modules]
})
export class AnalyticsModule { }
