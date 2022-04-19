import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NavigationComponent } from "./components/navigation/navigation.component";

const components = [LayoutComponent, NavigationComponent];

const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
      {path: 'consultation', loadChildren: () => import(`../consultation/consultation.module`).then(m => m.ConsultationModule)},
      {path: '', redirectTo: 'cards', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'disabled',
      anchorScrolling: 'enabled',
      preloadingStrategy: PreloadAllModules
    }),
    SharedModule],
  exports: [RouterModule],
  declarations: components
})
export class RoutingModule { }
