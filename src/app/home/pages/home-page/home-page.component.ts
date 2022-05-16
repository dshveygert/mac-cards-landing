import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { SubscriptionLike } from "rxjs";
import { fullUnsubscribe } from "../../../../utils";

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

  start(): void {
    this.getConsultation();
  }

  getConsultation(): void {
    this.router.navigate([`/payment`]).then();
  }


  ngOnDestroy(): void {
    fullUnsubscribe(this.dataSub);
  }

  constructor(private router: Router) { }
}
