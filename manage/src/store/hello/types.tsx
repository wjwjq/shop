import { Action } from 'redux';

export const INCREMENT_ENTHUSIASM = '@@hello/INCREMENT_ENTHUSIASM';
export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;

export const DECREMENT_ENTHUSIASM = '@@hello/DECREMENT_ENTHUSIASM';
export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM;

export interface IHelloState {
  languageName: string;
  enthusiasmLevel: number;
}

export interface IncrementEnthusiasm extends Action {
  type: INCREMENT_ENTHUSIASM;
}

export interface DecrementEnthusiasm extends Action {
  type: DECREMENT_ENTHUSIASM;
}

export type THelloAction = IncrementEnthusiasm | DecrementEnthusiasm;
