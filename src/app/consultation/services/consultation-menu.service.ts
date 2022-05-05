import { Injectable } from '@angular/core';
import { Collection } from "../../../utils/collection";
import { ELocalStorage, IConsultationMenu } from "../../api/models";
import { CryptoData, localStorageGetItem, localStorageSetItem } from "../../../utils/localStorage";

@Injectable()
export class ConsultationMenuService extends Collection<IConsultationMenu[]> {
  private crypto = new CryptoData(ELocalStorage.consultation_menu);

  private dataEmit(page: IConsultationMenu): void {
    const index = this.data?.findIndex(item => item === page);
    if (index < 0) {
      this.data = [...this.data, page];
    }
    localStorageSetItem(ELocalStorage.consultation_menu, JSON.stringify(this.data), this.crypto);
  }

  savePage(page: IConsultationMenu): void {
    return this.dataEmit(page);
  }

  isPageVisited(page: IConsultationMenu): boolean {
    return this.data?.findIndex(item => item === page) >= 0;
  }

  init(): void {
    const menu = localStorageGetItem(ELocalStorage.consultation_menu, this.crypto);
    if (menu) {
      this.data = JSON.parse(menu);
    } else {
      this.data = ['preparation'];
      localStorageSetItem(ELocalStorage.consultation_menu, JSON.stringify(this.data), this.crypto);
    }
  }

  constructor() {
    super();
  }
}
