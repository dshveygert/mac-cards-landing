import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiModule} from './api/api.module';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {SharedModule} from "./shared/shared.module";
import {LayoutComponent} from "./routing/components/layout/layout.component";
import {NavigationComponent} from "./routing/components/navigation/navigation.component";
import {HomePageComponent} from "./home/pages/home-page/home-page.component";
import {FooterComponent} from "./routing/components/footer/footer.component";
import {NotFoundPage} from "./routing/components/not-found/not-found.page";
import {AnalyticsModule} from "./analytics/analytics.module";

const components = [AppComponent, LayoutComponent, NavigationComponent, HomePageComponent, FooterComponent];

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: 'payment', loadChildren: () => import(`./payment/payment.module`).then(m => m.PaymentModule)},
      {
        path: 'consultation',
        loadChildren: () => import(`./consultation/consultation.module`).then(m => m.ConsultationModule)
      },
      {path: 'docs', loadChildren: () => import(`./documents/documents.module`).then(m => m.DocumentsModule)},
      {path: '', component: HomePageComponent, pathMatch: 'full'},
      {path: '**', component: NotFoundPage}
    ]
  }
];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'disabled',
      anchorScrolling: 'enabled',
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabledBlocking'
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    AnalyticsModule,
    ApiModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
