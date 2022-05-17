import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import {GoogleAnalyticsService} from "ngx-google-analytics";
import {ConsultationService} from "../../services/consultation.service";

@Component({
  selector: 'app-expired-page',
  templateUrl: './expired-page.component.html',
  styleUrls: ['./expired-page.component.sass']
})
export class ExpiredPageComponent implements OnInit {
  private gaCategory = 'expired_page';

  public getConsultation(): void {
    this.ga.event('want_new_consultation', this.gaCategory, this.consultation.uuid);
    this.router.navigate([`/payment`]).then();
  }

  public toHome(): void {
    this.router.navigate([`/`]).then();
  }

  ngOnInit(): void {
    this.ga.event('see_expired_consultation', this.gaCategory, this.consultation.uuid);
  }

  constructor(private router: Router, private ga: GoogleAnalyticsService, private consultation: ConsultationService) { }
}
