import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fullUnsubscribe } from 'src/utils';
import { SubscriptionLike, tap } from 'rxjs';
import { StepsListService } from '../../services/steps-list.service';
import { ConsultationService } from '../../services/consultation.service';
import { PreparationService } from '../../services/preparation.service';
import { ConsultationMenuService } from '../../services/consultation-menu.service';
import { ConsultationStatusService } from '../../services/consultation-status.service';

@Component({
  selector: 'app-consultation-layout-page',
  templateUrl: './consultation-layout-page.component.html',
  styleUrls: ['./consultation-layout-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationLayoutPageComponent implements OnInit, OnDestroy {
  private dataSub: SubscriptionLike[] = [];

  ngOnInit(): void {
    this.steps.init();
    this.dataSub.push(this.route.params.pipe(tap(({ paymentId }) => {
      this.consultation.init(paymentId);
      this.preparation.init(paymentId);
      this.status.init(paymentId);
      this.m.init(paymentId);
    })).subscribe());
  }

  ngOnDestroy(): void {
    this.steps.destroy();
    this.consultation.destroy();
    this.preparation.destroy();
    this.status.destroy();
    this.m.destroy();
    fullUnsubscribe(this.dataSub);
  }

  constructor(private steps: StepsListService, private route: ActivatedRoute, private m: ConsultationMenuService,
              private consultation: ConsultationService, private preparation: PreparationService,
              private status: ConsultationStatusService) {
  }
}
