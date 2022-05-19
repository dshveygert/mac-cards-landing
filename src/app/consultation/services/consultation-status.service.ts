import { Injectable } from '@angular/core';
import {catchError, filter, Observable, of, SubscriptionLike, tap} from 'rxjs';
import {fullUnsubscribe, generateMagicConsultationStatus} from '../../../utils';
import {Collection} from "../../../utils/collection";
import {SettingsService} from "../../routing/services/settings.service";
import {ConsultationApi} from "../../api/methods";
import {IConsultationResponse, IConsultationStatus} from "../../api/models";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable()
export class ConsultationStatusService extends Collection<IConsultationStatus> {
  private dataSub: SubscriptionLike[] = [];
  private _paymentId: string;

  private statusEmit(data: IConsultationResponse): void {
    if (data.message === 'success') {
      this.data = data.status;
      if (this.data.status === 'expired') {
        this.router.navigate([`/consultation/${this._paymentId}/expired`]).then();
      }
      if (this.data.status === 'pending') {
        this.router.navigate([`/payment/${this._paymentId}`]).then();
      }
    }
  }

  public statusData = (uuid: string): Observable<IConsultationResponse> =>  {
    return this.api.status(uuid);
  }

  public init(paymentId: string): void {
    this._paymentId = paymentId;
    if (paymentId === environment.magic_uuid) {
      console.log('MAGIC Consultation!');
      const c = generateMagicConsultationStatus(paymentId, "paid");
      this.statusEmit(c);
      return;
    }
    this.dataSub.push(this.statusData(paymentId).pipe(filter(d => !!d && !!d.message), tap(d => {
      this.statusEmit(d);
    }), catchError(err => {
      if (err?.error?.status.status === 'not_found') {
        this.router.navigate([`/payment`]).then();
      }
      return of({});
    })).subscribe());
  }

  destroy(): void {
    fullUnsubscribe(this.dataSub);
    this.data = {} as any;
    this._paymentId = '';
  }


  constructor(private api: ConsultationApi, private settings: SettingsService, private router: Router) {
    super();
  }
}
