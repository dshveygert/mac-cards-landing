import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConsultationService} from "../../services/consultation.service";
import {StepsListService} from "../../services/steps-list.service";
import {combineLatest, map, Observable} from "rxjs";
import {ICard, IStep} from "../../../api/models";
import {CardsListService} from "../../../shared/services/cards-list.service";
import {SettingsService} from "../../../routing/services/settings.service";

@Component({
  selector: 'app-consultation-page',
  templateUrl: './consultation-page.component.html',
  styleUrls: ['./consultation-page.component.sass']
})
export class ConsultationPageComponent implements OnInit, OnDestroy {
  currentStepId: IStep;
  step: IStep;

  get currentStep$(): Observable<IStep> {
    return combineLatest([this.steps.data$, this.consultation.currentStepId$]).pipe(map(([steps, current]) => steps?.find(d => d.id === current) ?? {} as IStep));
  }

  nextStep(step = 0): void {
    this.consultation.nextStepHandler(this.steps.nextStep(step));
  }

  card(step: IStep): ICard {
    return this.consultation.data?.log?.find(d => d.step.id === step.id)?.card ?? {} as ICard;
  }

  isStart(step: IStep): boolean {
    return (!step?.id && step?.id !== 0) || (!!step && step.id < 0);
  }

  selectCard(): void {
    this.cards.openDialog();
  }

  scrollToStep(currentStep: IStep): void {
    this.settings.scrollTo(`step${currentStep?.id}`);
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }

  constructor(public consultation: ConsultationService, public steps: StepsListService,
              public cards: CardsListService, private settings: SettingsService) { }
}
