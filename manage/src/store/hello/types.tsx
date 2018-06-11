import { Action } from 'redux';
import * as constants from './constants';

export interface IHelloState {
  languageName: string;
  enthusiasmLevel: number;
}

export interface IncrementEnthusiasm extends Action {
  type: constants.INCREMENT_ENTHUSIASM;
}

export interface DecrementEnthusiasm extends Action {
  type: constants.DECREMENT_ENTHUSIASM;
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;
