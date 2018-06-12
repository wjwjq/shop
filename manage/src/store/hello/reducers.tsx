import { IHelloState, THelloAction, INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from './types';

export const initialState: IHelloState = {
  enthusiasmLevel: 1,
  languageName: 'TypeScript'
};

const handlers = {
  [INCREMENT_ENTHUSIASM](state: IHelloState) {
    return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
  },

  [DECREMENT_ENTHUSIASM](state: IHelloState) {
    return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
  }
};

export default function helloReducers(state: IHelloState = initialState, action: THelloAction): IHelloState {
  return handlers[action.type] ? handlers[action.type](state) : state;
}
