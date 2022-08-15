import { AfterViewInit, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PreparationService } from '../../services/preparation.service';
import { environment } from '../../../../environments/environment';
import { SettingsService } from '../../../routing/services/settings.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ConsultationService } from '../../services/consultation.service';

@Component({
  selector: 'app-thanks-page',
  templateUrl: './thanks-page.component.html',
  styleUrls: ['./thanks-page.component.sass'],
})
export class ThanksPageComponent implements AfterViewInit {
  private gaCategory = 'thanks_page';

  config = {
    telegram: `https://t.me/${environment.feedback.telegram}`,
    whatsapp: `https://wa.me/${environment.feedback.whatsapp}`,
  };

  get workTheme$(): Observable<string> {
    return this.preparation.answerByFormCode$('final-question-form').pipe(map(t => !!t && t.value?.length > 0 ? `< ${t.value} >` : 'К сожалению, Вы не записали тему для проработки :(('));
  }

  public gaClick(type: string): void {
    this.ga.event(`feedback_${type}`, this.gaCategory, this.consultation.uuid);
  }

  ngAfterViewInit(): void {
    this.settings.scrollTop(0);
  }

  constructor(private preparation: PreparationService, private settings: SettingsService,
              private ga: GoogleAnalyticsService, private consultation: ConsultationService) {
  }
}
