import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MaterialDesignModule } from "./material/material.module";
import { CardsListComponent } from './components/cards-list/cards-list.component';

const modules = [CommonModule, FormsModule, ReactiveFormsModule, MaterialDesignModule];
const components = [CardsListComponent];

@NgModule({
  declarations: components,
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
