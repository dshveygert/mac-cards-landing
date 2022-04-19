import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  contentPath = '/assets/content';

  constructor() { }
}
