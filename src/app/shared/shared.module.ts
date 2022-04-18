import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

const modules = [CommonModule, FormsModule, ReactiveFormsModule];
const components = [];

@NgModule({
  declarations: [],
  imports: [
    ...modules,
    AngularSvgIconModule.forRoot(),
  ],
  exports: [
    ...modules,
    AngularSvgIconModule,
  ]
})
export class SharedModule { }
