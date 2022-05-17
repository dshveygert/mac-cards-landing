import {AfterViewInit, Component} from '@angular/core';
import { map, Observable } from "rxjs";
import { PreparationService } from "../../services/preparation.service";
import { Router } from "@angular/router";
import { SettingsService } from "../../../routing/services/settings.service";
import { ConsultationService } from "../../services/consultation.service";
import { GoogleAnalyticsService } from "ngx-google-analytics";

@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrls: ['./final-page.component.sass']
})
export class FinalPageComponent implements AfterViewInit {
  private gaCategory = 'final_page';

  get workTheme$(): Observable<string> {
    return this.preparation.answerByFormCode$('final-question-form').pipe(map(t => !!t && t.value?.length > 0 ? `< ${t.value} >` : 'К сожалению, Вы не записали тему для проработки :(('));
  }

  nextStep(): void {
    this.ga.event('complete_final_page', this.gaCategory, this.consultation.uuid);
    this.router.navigate([`/consultation/${this.consultation.uuid}/thanks`]).then();
    this.preparation.saveAnswerInDB('final');
  }

  ngAfterViewInit(): void {
    this.settings.scrollTop(0);
  }

  constructor(private preparation: PreparationService, private router: Router, private consultation: ConsultationService,
              private settings: SettingsService, private ga: GoogleAnalyticsService) { }
}
