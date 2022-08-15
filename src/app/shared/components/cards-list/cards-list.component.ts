import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ECardType, ICard } from '../../../api/models';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsListComponent implements OnInit {
  item: ICard;
  cardsInRow = 8;

  get cardsList(): ICard[] {
    return this.data.cards;
  }

  get cardType(): ECardType {
    return this.data?.cardType;
  }

  get viewCard(): boolean {
    return this.data?.viewCard;
  }

  get cardProportion(): string {
    return this.data?.cardProportion;
  }

  cardImage(item: ICard): string {
    const { img } = item;
    const cardImg = this.viewCard ? img ? img : 'empty.png' : `downFace_${this.cardType}.svg`;
    return `${this.data.cardImagePath}/${this.cardType}/${cardImg}`;
  }

  selectCard(item: ICard): void {
    this.onClose();
    this.data.selectCard(item, this.cardType);
  }

  onClose(): void {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: {
    cards: ICard[];
    cardProportion: string;
    cardType: ECardType;
    viewCard: boolean;
    cardImagePath: string;
    selectCard: (item: ICard, type: ECardType) => void
  }, private dialogRef: MatDialogRef<CardsListComponent>) {
  }
}
