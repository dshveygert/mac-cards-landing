import { Injectable } from '@angular/core';
import { ICard } from '../../api/models';
import { Collection } from "../../../utils/collection";
import { SettingsService } from "../../routing/services/settings.service";

@Injectable({
  providedIn: 'root'
})
export class CardsSelectedListService extends Collection<ICard[]> {

  selectCard(item: ICard): void {
    const current = !!this._data ? this._data : [];
    this.data = [...current, item];
  }

  get cardImagePath(): string {
    return `${this.settings.contentPath}/images/cards`;
  }

  init(): void {
  }

  destroy(): void {
    this.data = [];
  }


  constructor(private settings: SettingsService) {
    super();
  }
}
