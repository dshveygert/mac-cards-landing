import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MaterialDesignModule } from './material/material.module';

const modules = [CommonModule, FormsModule, ReactiveFormsModule, MaterialDesignModule];
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
