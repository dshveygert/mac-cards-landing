import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';


const modules = [MatToolbarModule, MatIconModule, MatButtonModule, MatButtonToggleModule, MatMenuModule,
  MatDialogModule, MatGridListModule];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class MaterialDesignModule {
}
