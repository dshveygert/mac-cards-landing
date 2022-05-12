import { Injectable } from '@angular/core';
import { Collection } from "../../../utils/collection";
import { ELocalStorage, IConsultationMenu, TConsultationMenu } from "../../api/models";
import { CryptoData, localStorageGetItem, localStorageSetItem } from "../../../utils/localStorage";

@Injectable()
export class ConsultationMenuService extends Collection<IConsultationMenu[]> {
  private crypto = new CryptoData(ELocalStorage.consultation_menu);
  private uuid: string;

  private dataEmit(page: TConsultationMenu): void {
    const visited = this.menuByUUID;
    const index = this.data?.findIndex(item => item.uuid === this.uuid);
    if (index >= 0 && !this.isPageVisited(page)) {
      const menu = [...this.data[index].menu, page];
      this.data[index] = {...visited, menu};
      localStorageSetItem(ELocalStorage.consultation_menu, JSON.stringify(this.data), this.crypto);
    }
  }

  get menuByUUID(): IConsultationMenu {
    return this.data?.find(item => item.uuid === this.uuid) ?? {} as IConsultationMenu;
  }

  savePage(page: TConsultationMenu): void {
    return this.dataEmit(page);
  }

  isPageVisited(page: TConsultationMenu): boolean {
    const visited = this.menuByUUID;
    return !!visited && visited['menu']?.findIndex(item => item === page) >= 0;
  }

  init(consultationSession: string): void {
    this.uuid = consultationSession;
    const menu = localStorageGetItem(ELocalStorage.consultation_menu, this.crypto);
    if (menu) {
      this.data = JSON.parse(menu);
    }
    if (this.data.findIndex(item => item.uuid === consultationSession) < 0) {
      this.data = [...this.data, {uuid: consultationSession, menu: ['preparation']}];
      localStorageSetItem(ELocalStorage.consultation_menu, JSON.stringify(this.data), this.crypto);
    }
  }

  destroy(): void {
    this.uuid = '';
  }

  constructor() {
    super();
    this.data = [];
  }
}
