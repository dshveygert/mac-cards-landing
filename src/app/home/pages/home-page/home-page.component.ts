import {ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  get price(): number {
    return environment.price.one_time;
  }

  start(): void {
    this.router.navigate([`/consultation/100500/preparation`]).then();
  }

  getConsultation(): void {
    this.router.navigate([`/consultation/100500/preparation`]).then();
  }

  constructor(private router: Router) { }
}
