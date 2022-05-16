import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-expired-page',
  templateUrl: './expired-page.component.html',
  styleUrls: ['./expired-page.component.sass']
})
export class ExpiredPageComponent {

  getConsultation(): void {
    this.router.navigate([`/payment`]).then();
  }

  toHome(): void {
    this.router.navigate([`/`]).then();
  }

  constructor(private router: Router) { }
}
