import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from "@angular/router";
import {SettingsService} from "../../../routing/services/settings.service";
import {ConsultationMenuService} from "../../services/consultation-menu.service";
import {ConsultationService} from "../../services/consultation.service";
import {PreparationService} from "../../services/preparation.service";

@Component({
  selector: 'app-preparation-page',
  templateUrl: './preparation-page.component.html',
  styleUrls: ['./preparation-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreparationPageComponent implements AfterViewInit {

  goToSteps(data: any): void {
    this.m.savePage('cards');
    this.router.navigate([`/consultation/${this.consultation.uuid}/cards`]).then();
    this.preparation.saveMainAnswerInDB();
  }

  ngAfterViewInit(): void {
    this.settings.scrollTop(0);
  }

  constructor(private settings: SettingsService, private router: Router, private consultation: ConsultationService,
              private m: ConsultationMenuService, private preparation: PreparationService) { }
}
