import { FETCH_USERS, FETCH_USERS_FULFILLED, FETCH_USERS_REJECT } from '../constants/foo';
import { IStoreState, FetchUserActions } from '../types/foo';

const store: IStoreState = {
  loading: false,
  fail: false,
  success: false,
  users: []
};

const handlers = {
  [FETCH_USERS](state: IStoreState, payload: IStoreState) {
    return { ...state, ...payload };
  },

  [FETCH_USERS_REJECT](state: IStoreState, payload: IStoreState) {
    return { ...state, ...payload };
  },

  [FETCH_USERS_FULFILLED](state: IStoreState, payload: IStoreState) {
    return { ...state, ...payload };
  }
};

export default function fooReducers(state: IStoreState = store, action: FetchUserActions): IStoreState {
  return handlers[action.type] ? handlers[action.type](state, action.payload) : state;
}
