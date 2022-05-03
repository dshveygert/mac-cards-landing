import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  config = {
    inn: environment.terms.inn,
    author: environment.terms.administrator,
    email: environment.feedback
  }

  constructor() { }

  ngOnInit(): void {
  }

}
