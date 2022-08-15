import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DocumentsLayoutPageComponent } from './pages/documents-layout-page/documents-layout-page.component';
import { TermsPageComponent } from './pages/terms-page/terms-page.component';
import { TermsComponent } from './components/terms/terms.component';

const components = [DocumentsLayoutPageComponent, TermsPageComponent, TermsComponent];
const routes: Routes = [
  {
    path: '', component: DocumentsLayoutPageComponent, children: [
      { path: '', redirectTo: 'terms', pathMatch: 'full' },
      { path: 'terms', component: TermsPageComponent },
    ],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: components,
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [],
})
export class DocumentsModule {
}
