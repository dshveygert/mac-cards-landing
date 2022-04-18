import {NgModule} from '@angular/core';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';

const modules = [MatSnackBarModule, MatDialogModule, MatSliderModule, MatTooltipModule, MatInputModule, MatCheckboxModule,
  MatFormFieldModule, MatSlideToggleModule, MatButtonModule, MatTabsModule, MatMenuModule,
  MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule,
  MatProgressSpinnerModule, MatSidenavModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000
      }
    },
    MatDatepickerModule
  ],
})
export class MaterialDesignModule {
}
