import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICard, IStep } from 'src/app/api/models';
import { CardsListService } from '../../../shared/services/cards-list.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent implements AfterViewInit {
  @Input() step: IStep;
  @Input() currentStep: IStep;
  @Input() card: ICard;
  @Output() nextStep = new EventEmitter();
  @Output() selectCard = new EventEmitter();
  @Output() scrollToStep = new EventEmitter();

  get cardImage(): string {
    const { img } = this.card;
    return `${this.cards.cardImagePath}/${this.step.card_type}/${img ? img : 'empty.png'}`;
  }

  get isCardSelected(): boolean {
    return !!this.card?.img;
  }

  get isShowNextButton(): boolean {
    return this.currentStep?.id === this.step.id && this.isCardSelected && this.step?.id < 4;
  }

  get stepId(): string {
    return `step${this.step.id}`;
  }

  get next(): string {
    return this.step.next ?? 'Следующий шаг';
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

  constructor(private cards: CardsListService) {
  }

}
