import { Injectable } from '@angular/core';
import { Collection } from "../../../utils/collection";
import {ELocalStorage, IConsultationMenu, IPreparation, IPreparationAnswer} from "../../api/models";
import {localStorageGetItem, localStorageSetItem} from "../../../utils/localStorage";
import {map, Observable} from "rxjs";

@Injectable()
export class ConsultationMenuService extends Collection<IConsultationMenu[]> {

  private dataEmit(page: IConsultationMenu): void {
    const index = this.data?.findIndex(item => item === page);
    console.log('index', page, index);
    if (index < 0) {
      this.data = [...this.data, page];
    }
    localStorageSetItem(ELocalStorage.consultation_menu, JSON.stringify(this.data));
  }

  savePage(page: IConsultationMenu): void {
    return this.dataEmit(page);
  }

  isPageVisited(page: IConsultationMenu): boolean {
    return this.data?.findIndex(item => item === page) >= 0;
  }

  init(): void {
    const menu = localStorageGetItem(ELocalStorage.consultation_menu);
    console.log('init menu', menu);
    if (menu) {
      this.data = JSON.parse(menu);
    } else {
      this.data = ['preparation'];
      localStorageSetItem(ELocalStorage.consultation_menu, JSON.stringify(this.data));
    }
  }

  constructor() {
    super();
  }
}
