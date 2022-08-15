import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IConsultationResponse, IDefaultResponse } from '../models';

@Injectable()
export class ConsultationApi {
  private api = `${environment.api.host}/api/v1`;

  public status(paymentId: string): Observable<IConsultationResponse> {
    return this.http.get<IConsultationResponse>(`${this.api}/consultation/${paymentId}`);
  }

  public saveAnswers(paymentId: string, data: any): Observable<IDefaultResponse> {
    return this.http.post<IDefaultResponse>(`${this.api}/consultation/${paymentId}/answer`, data);
  }

  constructor(private http: HttpClient) {
  }
}
