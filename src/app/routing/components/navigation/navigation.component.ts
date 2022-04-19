import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatDialog} from '@angular/material/dialog';
import {CardsListComponent} from "../../../shared/components/cards-list/cards-list.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  openDialog() {
    const dialogRef = this.dialog.open(CardsListComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  //
  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {}
}
