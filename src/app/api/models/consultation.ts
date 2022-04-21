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
