import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";
import { PreparationService } from "../../services/preparation.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-thanks-page',
  templateUrl: './thanks-page.component.html',
  styleUrls: ['./thanks-page.component.sass']
})
export class ThanksPageComponent implements OnInit {
  config = {
    telegram: `https://t.me/${environment.feedback.telegram}`,
    whatsapp: `https://wa.me/${environment.feedback.whatsapp}`
  }

  get workTheme$(): Observable<string> {
    return this.preparation.answerByFormCode$('final-question-form').pipe(map(t => !!t && t.value?.length > 0 ? `< ${t.value} >` : 'К сожалению, Вы не записали тему для проработки :(('));
  }

  ngOnInit(): void {
  }

  constructor(private preparation: PreparationService) { }
}
