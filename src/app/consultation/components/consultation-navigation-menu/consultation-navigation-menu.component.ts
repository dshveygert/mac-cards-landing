import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ConsultationMenuService} from "../../services/consultation-menu.service";

@Component({
  selector: 'app-consultation-navigation-menu',
  templateUrl: './consultation-navigation-menu.component.html',
  styleUrls: ['./consultation-navigation-menu.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultationNavigationMenuComponent {

  constructor(public m: ConsultationMenuService) { }
}
