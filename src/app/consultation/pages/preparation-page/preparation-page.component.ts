import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from "@angular/router";
import {SettingsService} from "../../../routing/services/settings.service";

@Component({
  selector: 'app-preparation-page',
  templateUrl: './preparation-page.component.html',
  styleUrls: ['./preparation-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreparationPageComponent implements AfterViewInit {

  goToSteps(data: any): void {
    this.router.navigate([`/consultation/100500/cards`]).then();
  }

  ngAfterViewInit(): void {
    this.settings.scrollTop(0);
  }

  constructor(private settings: SettingsService, private router: Router) { }
}
