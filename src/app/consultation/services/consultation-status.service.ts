import { Injectable } from '@angular/core';
import {catchError, filter, Observable, of, SubscriptionLike, tap} from 'rxjs';
import {fullUnsubscribe} from '../../../utils';
import {Collection} from "../../../utils/collection";
import {SettingsService} from "../../routing/services/settings.service";
import {ConsultationApi} from "../../api/methods";
import {IConsultationResponse, IConsultationStatus} from "../../api/models";
import {Router} from "@angular/router";

@Injectable()
export class ConsultationStatusService extends Collection<IConsultationStatus> {
  private dataSub: SubscriptionLike[] = [];

  public statusData = (uuid: string): Observable<IConsultationResponse> =>  {
    return this.api.status(uuid);
  }

  public init(consultationSession: string): void {
    this.dataSub.push(this.statusData(consultationSession).pipe(filter(d => !!d && !!d.message), tap(d => {
      if (d.message === 'success') {
        this.data = d.status;
        if (this.data.status === 'expired') {
          this.router.navigate([`/consultation/${consultationSession}/expired`]).then();
        }
        if (this.data.status === 'pending') {
          this.router.navigate([`/payment/${consultationSession}`]).then();
        }
      }
    }), catchError(err => {
      if (err?.error?.status.status === 'not_found') {
        this.router.navigate([`/payment`]).then();
      }
      return of();
    })).subscribe());
  }

  destroy(): void {
    fullUnsubscribe(this.dataSub);
    this.data = {} as any;
  }


  constructor(private api: ConsultationApi, private settings: SettingsService, private router: Router) {
    super();
  }
}
