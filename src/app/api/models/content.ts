import { Observable } from "rxjs";

export interface ICollection<T = any> {
  data: T;
  data$: Observable<T>;
  init?(...params: any): void;
  destroy?(): void;
}

export interface ICard {
  id: number;
  img: string;
  name?: string;
  description?: string;
  selected?: boolean;
}

export interface IStep {
  id: number;
  title: string;
  description: string;
  audio: string;
  video: string;
  consultation: string;
}

export const enum ILocalStorage {
  consultation = 'consultation',
  settings = 'settings'
}

export interface IDocConfig {
  host: string;
}
