import {Component, Input, OnInit} from '@angular/core';
import {IDocConfig} from "../../../api/models";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.sass']
})
export class TermsComponent implements OnInit {
  @Input() config: IDocConfig;

  constructor() { }

  ngOnInit(): void {
  }

}
