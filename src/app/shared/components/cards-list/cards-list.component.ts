import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {filter, map, Observable} from "rxjs";
import {ECardType, ICard} from "../../../api/models";
import {CardsListService} from "../../services/cards-list.service";
import {CardsSelectedListService} from "../../services/cards-selected-list.service";
import {ConsultationService} from "../../../consultation/services/consultation.service";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsListComponent implements OnInit {
  cardsList: ICard[];
  item: ICard;
  cardsInRow = 8;

  get cardsList$(): Observable<ICard[]> {
    return this.cards.data$.pipe(filter(d => !!d), map(d => d[this.cardType]));
  }

  get cardType(): ECardType {
    return this.data?.cardType;
  }

  get viewCard(): boolean {
    return this.data?.viewCard;
  }

  cardImage(item: ICard): string {
    const {img} = item;
    const cardImg = this.viewCard ? img ? img : 'empty.png' : `downFace_${this.cardType}.svg`;
    return `${this.cards.cardImagePath}/${this.cardType}/${cardImg}`;
  }

  selectCard(item: ICard): void {
    this.onClose();
    this.selected.selectCard(item);
    this.consultation.selectedCardHandler(item);
  }

  onClose(): void {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

  constructor(public cards: CardsListService, private selected: CardsSelectedListService, private consultation: ConsultationService,
              @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<CardsListComponent>) { }
}
