import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";
import { PreparationService } from "../../services/preparation.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrls: ['./final-page.component.sass']
})
export class FinalPageComponent {
  get workTheme$(): Observable<string> {
    return this.preparation.answerByFormCode$('final-question-form').pipe(map(t => !!t && t.value?.length > 0 ? `< ${t.value} >` : 'К сожалению, Вы не записали тему для проработки :(('));
  }

  nextStep(): void {
    this.router.navigate([`/consultation/100500/thanks`]).then();
  }

  constructor(private preparation: PreparationService, private router: Router) { }
}
