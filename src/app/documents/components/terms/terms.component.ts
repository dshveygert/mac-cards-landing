import {Component, Input, AfterViewInit} from '@angular/core';
import {IDocConfig} from "../../../api/models";
import {SettingsService} from "../../../routing/services/settings.service";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.sass']
})
export class TermsComponent implements AfterViewInit {
  @Input() config: IDocConfig;

  ngAfterViewInit(): void {
    this.settings.scrollTop(0);
  }

  constructor(private settings: SettingsService) { }
}
