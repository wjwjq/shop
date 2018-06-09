import { EnthusiasmAction } from '../actions/hello';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants/hello';

export interface StoreState {
  languageName: string;
  enthusiasmLevel: number;
}

const store: StoreState = {
  enthusiasmLevel: 1,
  languageName: 'TypeScript'
};

const handlers = {
  [INCREMENT_ENTHUSIASM](state: StoreState) {
    return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
  },

  [DECREMENT_ENTHUSIASM](state: StoreState) {
    return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
  }
};

export default function helloReducers(state: StoreState = store, action: EnthusiasmAction): StoreState {
  return handlers[action.type] ?  handlers[action.type](state) : state;
}
