import {ICard, IStep} from "./content";

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

export type IConsultationMenu = 'final' | 'cards' | 'preparation';
