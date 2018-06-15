import { FooState, FooActions, ActionsEnum  } from './types';

export const initialState: FooState = {
  loading: false,
  fail: false,
  success: false,
  users: []
};

const handlers = {
  [ActionsEnum.FETCH_USERS](state: FooState, payload: FooState) {
    return { ...state, ...payload };
  },

  [ActionsEnum.FETCH_USERS_REJECT](state: FooState, payload: FooState) {
    return { ...state, ...payload };
  },

  [ActionsEnum.FETCH_USERS_FULFILLED](state: FooState, payload: FooState) {
    return { ...state, ...payload };
  }
};

export default function fooReducers(state: FooState = initialState, action: FooActions): FooState {
  return handlers[action.type] ? handlers[action.type](state, action.payload) : state;
}

export type fooReducers = typeof fooReducers;
