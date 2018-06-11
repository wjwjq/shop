import { FETCH_USERS, FETCH_USERS_FULFILLED, FETCH_USERS_REJECT } from './constants';
import { IFooState, FetchUserActions } from './types';

const store: IFooState = {
  loading: false,
  fail: false,
  success: false,
  users: []
};

const handlers = {
  [FETCH_USERS](state: IFooState, payload: IFooState) {
    return { ...state, ...payload };
  },

  [FETCH_USERS_REJECT](state: IFooState, payload: IFooState) {
    return { ...state, ...payload };
  },

  [FETCH_USERS_FULFILLED](state: IFooState, payload: IFooState) {
    return { ...state, ...payload };
  }
};

export default function fooReducers(state: IFooState = store, action: FetchUserActions): IFooState {
  return handlers[action.type] ? handlers[action.type](state, action.payload) : state;
}
