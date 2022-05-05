import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, SubscriptionLike, tap} from 'rxjs';
import {ECardType, ICardCollection} from '../../api/models';
import {fullUnsubscribe} from '../../../utils';
import {Collection} from "../../../utils/collection";
import {SettingsService} from "../../routing/services/settings.service";
import {CardsListComponent} from "../components/cards-list/cards-list.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class CardsListService extends Collection<ICardCollection> {
  private dataSub: SubscriptionLike[] = [];
  private fileName = 'cards.json';

  private dataRequest = (): Observable<ICardCollection> =>  {
    return this.http.get<ICardCollection>(`${this.settings.contentPath}/${this.fileName}`);
  }

  get cardImagePath(): string {
    return `${this.settings.contentPath}/images/cards`;
  }

  get cardProportion(): string {
    return '165:254';
  }

  openDialog(cardType = ECardType.whale) {
    const config = {
      maxWidth: '94vw',
      maxHeight: '94vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      data: {
        cardType,
        viewCard: false
      }
    };
    const dialogRef = this.dialog.open(CardsListComponent, config);
  }

  init(): void {
    this.dataSub.push(this.dataRequest().pipe(tap(cards => {
      this.data = cards;
    })).subscribe());
  }

  destroy(): void {
    fullUnsubscribe(this.dataSub);
    this.data = {} as ICardCollection;
  }


  constructor(private http: HttpClient, private settings: SettingsService, private dialog: MatDialog) {
    super();
  }
}
