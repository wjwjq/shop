import { IFooState, TFooActions, ActionsEnum  } from './types';

export const initialState: IFooState = {
  loading: false,
  fail: false,
  success: false,
  users: []
};

const handlers = {
  [ActionsEnum.FETCH_USERS](state: IFooState, payload: IFooState) {
    return { ...state, ...payload };
  },

  [ActionsEnum.FETCH_USERS_REJECT](state: IFooState, payload: IFooState) {
    return { ...state, ...payload };
  },

  [ActionsEnum.FETCH_USERS_FULFILLED](state: IFooState, payload: IFooState) {
    return { ...state, ...payload };
  }
};

export default function fooReducers(state: IFooState = initialState, action: TFooActions): IFooState {
  return handlers[action.type] ? handlers[action.type](state, action.payload) : state;
}

export type fooReducers = typeof fooReducers;
