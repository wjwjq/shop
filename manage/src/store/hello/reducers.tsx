import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from './constants';
import { IHelloState, EnthusiasmAction } from './types';

const store: IHelloState = {
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

export default function helloReducers(state: IHelloState = store, action: EnthusiasmAction): IHelloState {
  return handlers[action.type] ? handlers[action.type](state) : state;
}
