import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Observable} from "rxjs";
import {ICard} from "../../../api/models";
import {CardsListService} from "../../services/cards-list.service";
import {CardsSelectedListService} from "../../services/cards-selected-list.service";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsListComponent implements OnInit {
  public cardsList: ICard[];
  public item: ICard;

  get cardsList$(): Observable<ICard[]> {
    return this.cards.data$;
  }

  cardImage(item: ICard): string {
    const {img} = item;
    return `${this.cards.cardImagePath}/${img ? img : 'empty.png'}`;
  }

  selectCard(item: ICard): void {
    this.onClose();
    this.selected.selectCard(item);
  }

  onClose(): void {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

  constructor(public cards: CardsListService, private selected: CardsSelectedListService,
              @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<CardsListComponent>) { }
}
