import {ICard, IDefaultResponse, IStep} from "./content";

export interface ICardByStep {
  step: IStep;
  card: ICard;
}
export interface IConsultation {
  uuid: string;
  currentStep: IStep;
  log: ICardByStep[];
}

export interface IPreparation {
  uuid: string;
  answer: IPreparationAnswer;
}

export interface IPreparationAnswer {
  form_code: string;
  value: string;
}

export type TConsultationMenu = 'final' | 'cards' | 'preparation';

export interface IConsultationMenu {
  uuid: string;
  menu: TConsultationMenu[];
}

export interface IConsultationStorage {
  [uuid: string]: IConsultation;
}

export type TConsultationStatus = 'pending' | 'paid' | 'canceled' | 'expired';

export interface IConsultationStatus {
  id: string;
  captured_at?: string;
  created_at: string;
  status: TConsultationStatus;
  test: string;
}

export interface IConsultationResponse extends IDefaultResponse {
  status: IConsultationStatus;
}
