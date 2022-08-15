import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  config = {
    inn: environment.terms.inn,
    author: environment.terms.administrator,
    email: environment.feedback.email,
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
