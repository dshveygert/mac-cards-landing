import { NgModule } from '@angular/core';
import { RouterModule , Routes} from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { StepsListService } from "./services/steps-list.service";
import { ConsultationMenuService } from "./services/consultation-menu.service";
import { ConsultationLayoutPageComponent } from './pages/consultation-layout-page/consultation-layout-page.component';
import { ConsultationPageComponent } from './pages/consultation-page/consultation-page.component';
import { StepComponent } from "./components/step/step.component";
import { PreparationPageComponent } from './pages/preparation-page/preparation-page.component';
import { FormMainQuestionComponent } from "./components/form/form-main-question/form-main-question.component";
import { FinalPageComponent } from "./pages/final-page/final-page.component";
import { ThanksPageComponent } from './pages/thanks-page/thanks-page.component';
import { ConsultationNavigationMenuComponent } from "./components/consultation-navigation-menu/consultation-navigation-menu.component";
import { ConsultationStatusService } from "./services/consultation-status.service";
import { ExpiredPageComponent } from './pages/expired-page/expired-page.component';

const components = [ConsultationLayoutPageComponent, ConsultationPageComponent, StepComponent, PreparationPageComponent,
  FormMainQuestionComponent, FinalPageComponent, ThanksPageComponent, ConsultationNavigationMenuComponent, ExpiredPageComponent];
const routes: Routes = [
  {path: ':paymentId', component: ConsultationLayoutPageComponent, children: [
    {path: '', redirectTo: 'preparation', pathMatch: 'full'},
    {path: 'preparation', component: PreparationPageComponent},
    {path: 'cards', component: ConsultationPageComponent},
    {path: 'final', component: FinalPageComponent},
    {path: 'thanks', component: ThanksPageComponent},
    {path: 'expired', component: ExpiredPageComponent}
  ]},
  {path: '', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  declarations: components,
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [StepsListService, ConsultationMenuService, ConsultationStatusService]
})
export class ConsultationModule { }
