import { Component, OnInit } from '@angular/core';
import {IDocConfig} from "../../../api/models";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.sass']
})
export class TermsPageComponent implements OnInit {
  config: IDocConfig = {
    host: environment.host,
    administrator: environment.terms.administrator,
    inn: environment.terms.inn,
    email: environment.feedback
  };

  constructor() { }

  ngOnInit(): void {
  }

}
