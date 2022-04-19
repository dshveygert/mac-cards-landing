import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardsListService} from "../../../shared/services/cards-list.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    this.cards.init();
  }
  ngOnDestroy(): void {
    this.cards.destroy();
  }

  constructor(private cards: CardsListService) { }
}
