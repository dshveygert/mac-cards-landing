import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { SubscriptionLike } from 'rxjs';
import { fullUnsubscribe } from '../../../../utils';
import { ConsultationService } from '../../../consultation/services/consultation.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnDestroy {
  private dataSub: SubscriptionLike[] = [];
  private gaCategory = 'home_page';

  get price(): number {
    return environment.price.one_time;
  }

  get hasLastConsultation(): boolean {
    return !!this.consultation.consultations && !!this.consultation.lastConsultation?.uuid;
  }

  get startButton(): string {
    return !!this.consultation.consultations ? 'Перейти к консультации' : 'Начать';
  }

  public goToExistingConsultation(): void {
    this.ga.event('get_consultation_again', this.gaCategory, this.consultation.lastConsultation?.uuid);
    this.router.navigate([`/consultation/${this.consultation.lastConsultation?.uuid}/preparation`]).then();
  }

  public start(): void {
    if (this.hasLastConsultation) {
      this.goToExistingConsultation();
    } else {
      this.ga.event('get_consultation', this.gaCategory, 'start');
      this.router.navigate([`/payment`]).then();
    }
  }

  public getConsultation(): void {
    this.ga.event('get_consultation', this.gaCategory, 'get_consultation_button');
    this.router.navigate([`/payment`]).then();
  }


  ngOnDestroy(): void {
    fullUnsubscribe(this.dataSub);
  }

  constructor(private router: Router, private consultation: ConsultationService, private ga: GoogleAnalyticsService) {
  }
}
