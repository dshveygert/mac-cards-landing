import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {fullUnsubscribe} from 'src/utils';
import {SubscriptionLike, tap} from 'rxjs';
import {StepsListService} from "../../services/steps-list.service";
import {ConsultationService} from "../../services/consultation.service";
import {PreparationService} from "../../services/preparation.service";
import {ConsultationMenuService} from "../../services/consultation-menu.service";

@Component({
  selector: 'app-consultation-layout-page',
  templateUrl: './consultation-layout-page.component.html',
  styleUrls: ['./consultation-layout-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultationLayoutPageComponent implements OnInit, OnDestroy {
  private dataSub: SubscriptionLike[] = [];
  ngOnInit(): void {
    this.steps.init();
    this.dataSub.push(this.route.params.pipe(tap(({consultationSession}) => {
      this.consultation.init(consultationSession);
      this.preparation.init(consultationSession);
      this.m.init();
    })).subscribe());
  }
  ngOnDestroy(): void {
    this.steps.destroy();
    this.consultation.destroy();
    fullUnsubscribe(this.dataSub);
  }

  constructor(private steps: StepsListService, private route: ActivatedRoute, private m: ConsultationMenuService,
              private consultation: ConsultationService, private preparation: PreparationService) { }
}
