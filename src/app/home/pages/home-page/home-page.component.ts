import { Component } from '@angular/core';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent {
  get price(): number {
    return environment.price.one_time;
  }

  start(): void {

  }

  getConsultation(): void {

  }

  constructor() { }
}
