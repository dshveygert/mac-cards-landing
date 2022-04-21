import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, SubscriptionLike, tap} from 'rxjs';
import {IStep} from '../../api/models';
import {fullUnsubscribe} from '../../../utils';
import {Collection} from "../../../utils/collection";
import {SettingsService} from "../../routing/services/settings.service";

@Injectable()
export class StepsListService extends Collection<IStep[]> {
  private dataSub: SubscriptionLike[] = [];
  private fileName = 'steps.json';

  private dataRequest = (): Observable<IStep[]> =>  {
    return this.http.get<IStep[]>(`${this.settings.contentPath}/${this.fileName}`);
  }

  nextStep(currentStepId: number): IStep {
    const nextId = currentStepId + 1;
    const length = this.data?.length;
    const next = this.data?.find(d => d.id === (nextId < length ? nextId : length));
    return next ?? this.data[length - 1];
  }

  init(): void {
    this.dataSub.push(this.dataRequest().pipe(tap(steps => {
      this.data = steps;
    })).subscribe());
  }

  destroy(): void {
    fullUnsubscribe(this.dataSub);
    this.data = [];
  }


  constructor(private http: HttpClient, private settings: SettingsService) {
    super();
  }
}
