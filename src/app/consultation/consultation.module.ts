import { NgModule } from '@angular/core';
import { RouterModule , Routes} from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ConsultationLayoutPageComponent } from './pages/consultation-layout-page/consultation-layout-page.component';
import { ConsultationPageComponent } from './pages/consultation-page/consultation-page.component';

const components = [ConsultationLayoutPageComponent, ConsultationPageComponent];
const routes: Routes = [
  {path: ':consultationSession', component: ConsultationLayoutPageComponent, children: [
    {path: '', redirectTo: 'info', pathMatch: 'full'},
    {path: 'info', component: ConsultationPageComponent}
  ]},
  {path: '', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  declarations: components,
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class ConsultationModule { }
