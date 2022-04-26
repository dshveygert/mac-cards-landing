import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from '../home/pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NavigationComponent } from "./components/navigation/navigation.component";

const components = [LayoutComponent, NavigationComponent];

const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
      {path: 'consultation', loadChildren: () => import(`../consultation/consultation.module`).then(m => m.ConsultationModule)},
      {path: 'docs', loadChildren: () => import(`../documents/documents.module`).then(m => m.DocumentsModule)},
      {path: '', component: HomePageComponent, pathMatch: 'full'}
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
