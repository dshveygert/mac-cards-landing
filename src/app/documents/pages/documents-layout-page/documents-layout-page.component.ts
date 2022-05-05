import {AfterViewInit, Component} from '@angular/core';
import {SettingsService} from "../../../routing/services/settings.service";

@Component({
  selector: 'app-documents-layout-page',
  templateUrl: './documents-layout-page.component.html',
  styleUrls: ['./documents-layout-page.component.sass']
})
export class DocumentsLayoutPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.settings.scrollTop(0);
  }

  constructor(private settings: SettingsService) { }
}
