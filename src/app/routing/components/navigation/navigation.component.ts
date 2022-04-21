import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {CardsListService} from "../../../shared/services/cards-list.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  //
  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );

  constructor(private breakpointObserver: BreakpointObserver, public cards: CardsListService) {}
}
