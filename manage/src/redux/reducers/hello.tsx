import { EnthusiasmAction } from '../actions/hello';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants/index';

export interface StoreState {
  languageName: string;
  enthusiasmLevel: number;
}

const store: StoreState = {
  enthusiasmLevel: 1,
  languageName: 'TypeScript'
};

export default function enthusiasm(state: StoreState = store, action: EnthusiasmAction): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    default:
      return state;
  }
}
