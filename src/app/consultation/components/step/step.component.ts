import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICard, IStep} from 'src/app/api/models';
import {CardsListService} from "../../../shared/services/cards-list.service";

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent implements AfterViewInit {
  @Input() step: IStep;
  @Input() currentStep: IStep;
  @Input() card: ICard;
  @Output() nextStep = new EventEmitter();
  @Output() selectCard = new EventEmitter();
  @Output() scrollToStep = new EventEmitter();

  get cardImage(): string {
    const {img} = this.card;
    return `${this.cards.cardImagePath}/${img ? img : 'empty.png'}`
  }

  get isCardSelected(): boolean {
    return !!this.card?.img;
  }

  get isShowNextButton(): boolean {
    return this.currentStep?.id === this.step.id && this.isCardSelected && this.step?.id < 3;
  }

  get stepId(): string {
    return `step${this.step.id}`;
  }

  selectCardHandler(): void {
    this.selectCard.emit();
  }

  nextStepHandler(): void {
    this.nextStep.emit();
  }

  ngAfterViewInit(): void {
    if (this.currentStep?.id === this.step.id) {
      this.scrollToStep.emit();
    }
  }

  constructor(private cards: CardsListService) { }

}
