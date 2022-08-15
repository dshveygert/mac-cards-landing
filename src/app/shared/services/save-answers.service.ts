import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultationApi } from '../../api/methods';
import { IPreparation, TAnswerType } from '../../api/models';

@Injectable({ providedIn: 'root' })
export class SaveAnswersService {

  public saveData = (paymentId: string, data: IPreparation[], type: TAnswerType, uuid = ''): Observable<any> => {
    const answers = !!data && data.reduce((a: any, d: IPreparation) => {
      return [...a, { form: d.answer.form_code, value: d.answer.value }];
    }, []);
    return this.api.saveAnswers(paymentId, { answers, uuid, type, paymentId });
  };

  constructor(private api: ConsultationApi) {
  }
}
