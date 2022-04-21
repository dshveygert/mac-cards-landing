import { NgModule } from '@angular/core';
import { RouterModule , Routes} from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { StepsListService } from "./services/steps-list.service";
import { ConsultationLayoutPageComponent } from './pages/consultation-layout-page/consultation-layout-page.component';
import { ConsultationPageComponent } from './pages/consultation-page/consultation-page.component';
import { StepComponent } from "./components/step/step.component";

const components = [ConsultationLayoutPageComponent, ConsultationPageComponent, StepComponent];
const routes: Routes = [
  {path: ':consultationSession', component: ConsultationLayoutPageComponent, children: [
    {path: '', redirectTo: 'cards', pathMatch: 'full'},
    {path: 'cards', component: ConsultationPageComponent}
  ]},
  {path: '', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  declarations: components,
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [StepsListService]
})
export class ConsultationModule { }
