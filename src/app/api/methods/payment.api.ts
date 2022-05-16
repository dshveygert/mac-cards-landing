import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {IPaymentResponse} from "../models";

@Injectable()
export class PaymentApi {
  private api = `${environment.api.host}/api/v1`;

  public paymentCreate(key: string): Observable<IPaymentResponse> {
    return this.http.get<IPaymentResponse>(`${this.api}/create-payment`, {params: {key}});
  }
  public paymentStatus(paymentId: string): Observable<IPaymentResponse> {
    return this.http.get<IPaymentResponse>(`${this.api}/payment/${paymentId}`);
  }

  constructor(private http: HttpClient) {
  }
}
