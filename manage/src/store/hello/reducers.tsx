import { HelloState, HelloAction, INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from './types';

export const initialState: HelloState = {
  enthusiasmLevel: 1,
  languageName: 'TypeScript'
};

const handlers = {
  [INCREMENT_ENTHUSIASM](state: HelloState) {
    return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
  },

  [DECREMENT_ENTHUSIASM](state: HelloState) {
    return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
  }
};

export default function helloReducers(state: HelloState = initialState, action: HelloAction): HelloState {
  return handlers[action.type] ? handlers[action.type](state) : state;
}
