import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {ConsultationService} from "../../services/consultation.service";
import {StepsListService} from "../../services/steps-list.service";
import {combineLatest, map, Observable} from "rxjs";
import {ECardType, ICard, IStep} from "../../../api/models";
import {CardsListService} from "../../../shared/services/cards-list.service";
import {SettingsService} from "../../../routing/services/settings.service";
import {PreparationService} from "../../services/preparation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-consultation-page',
  templateUrl: './consultation-page.component.html',
  styleUrls: ['./consultation-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultationPageComponent implements AfterViewInit {
  currentStepId: IStep;
  step: IStep;

  get currentStep$(): Observable<IStep> {
    return combineLatest([this.steps.data$, this.consultation.currentStepId$]).pipe(map(([steps, current]) => steps?.find(d => d.id === current) ?? {} as IStep));
  }

  get workTheme$(): Observable<string> {
    return this.preparation.answerByFormCode$('final-question-form').pipe(map(t => !!t && t.value?.length > 0 ? `< ${t.value} >` : 'К сожалению, Вы не записали тему для проработки :(('));
  }

  nextStep(step = 0): void {
    if (step === 3) {
      this.router.navigate([`/consultation/100500/final`]).then();
      return;
    }
    this.consultation.nextStepHandler(this.steps.nextStep(step));
  }

  card(step: IStep): ICard {
    return this.consultation.data?.log?.find(d => d.step.id === step.id)?.card ?? {} as ICard;
  }

  isStart(step: IStep): boolean {
    return (!step?.id && step?.id !== 0) || (!!step && step.id < 0);
  }

  selectCard(type: ECardType): void {
    this.cards.openDialog(type);
  }

  scrollToStep(currentStep: IStep): void {
    this.settings.scrollTo(`step${currentStep?.id}`);
  }

  ngAfterViewInit(): void {
    this.settings.scrollTop(0);
  }

  constructor(public consultation: ConsultationService, public steps: StepsListService,
              public cards: CardsListService, private settings: SettingsService,
              private preparation: PreparationService, private router: Router) { }
}
