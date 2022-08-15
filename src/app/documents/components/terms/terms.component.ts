import { Component, Input } from '@angular/core';
import { IDocConfig } from '../../../api/models';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.sass'],
})
export class TermsComponent {
  @Input() config: IDocConfig;

  constructor() {
  }
}
