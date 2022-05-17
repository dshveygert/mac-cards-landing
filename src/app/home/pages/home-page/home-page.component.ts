import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { SubscriptionLike } from "rxjs";
import { fullUnsubscribe } from "../../../../utils";
import { ConsultationService } from "../../../consultation/services/consultation.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnDestroy {
  private dataSub: SubscriptionLike[] = [];

  get price(): number {
    return environment.price.one_time;
  }

  get startButton(): string {
    return !!this.consultation.consultations ? 'Перейти к консультации' : 'Начать';
  }

  public start(): void {
    if (!!this.consultation.consultations && !!this.consultation.lastConsultation?.uuid) {
      this.router.navigate([`/consultation/${this.consultation.lastConsultation?.uuid}/preparation`]).then();
    } else {
      this.getConsultation();
    }
  }

  public getConsultation(): void {
    this.router.navigate([`/payment`]).then();
  }


  ngOnDestroy(): void {
    fullUnsubscribe(this.dataSub);
  }

  constructor(private router: Router, private consultation: ConsultationService) { }
}
