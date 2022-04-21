import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, SubscriptionLike, tap} from 'rxjs';
import {ICard} from '../../api/models';
import {fullUnsubscribe} from '../../../utils';
import {Collection} from "../../../utils/collection";
import {SettingsService} from "../../routing/services/settings.service";
import {CardsListComponent} from "../components/cards-list/cards-list.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class CardsListService extends Collection<ICard[]> {
  private dataSub: SubscriptionLike[] = [];
  private fileName = 'cards.json';

  private dataRequest = (): Observable<ICard[]> =>  {
    return this.http.get<ICard[]>(`${this.settings.contentPath}/${this.fileName}`);
  }

  get cardImagePath(): string {
    return `${this.settings.contentPath}/images/cards`;
  }

  get cardProportion(): string {
    return '165:254';
  }

  openDialog() {
    const dialogRef = this.dialog.open(CardsListComponent, {
      maxWidth: '94vw',
      maxHeight: '94vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
  }

  init(): void {
    this.dataSub.push(this.dataRequest().pipe(tap(cards => {
      this.data = cards;
    })).subscribe());
  }

  destroy(): void {
    fullUnsubscribe(this.dataSub);
    this.data = [];
  }


  constructor(private http: HttpClient, private settings: SettingsService, private dialog: MatDialog) {
    super();
  }
}
