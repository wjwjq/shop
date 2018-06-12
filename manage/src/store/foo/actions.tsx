import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Dispatch } from 'react-redux';

import * as Types from './types';
import { fooReducers } from './reducers';
import { user as UserApi } from '../../lib/api';

const fetchUserLoading: ActionCreator<Types.IFetchUser> = () => ({
  type: Types.ActionsEnum.FETCH_USERS,
  payload: {
    loading: true,
    fail: false,
    success: false
  }
});

const fetchUserReject: ActionCreator<Types.IFetchUserReject> = () => ({
  type: Types.ActionsEnum.FETCH_USERS_REJECT,
  payload: {
    loading: false,
    fail: true,
    success: false
  }
});

const fetchUserFulfilled: ActionCreator<Types.IFetchUserFulfilled> = (users: Types.TUsers) => ({
  type: Types.ActionsEnum.FETCH_USERS_FULFILLED,
  payload: {
    users,
    loading: false,
    fail: false,
    success: true
  }
});

export function fetchUser() {
  return async (dispatch: Dispatch<Types.TFooActions>): Promise<any> => {
    try {
      dispatch(fetchUserLoading());
      const res = await UserApi.get();
      const users = await res.results;
      return dispatch(fetchUserFulfilled(users));
    } catch (err) {
      return dispatch(fetchUserReject());
    }
  };
}

export const fetchUser2: ThunkAction<fooReducers, Types.IFooState, {}, Types.TFooActions> = () => {
  return (dispatch: Dispatch<Types.TFooActions>) => {
    dispatch(fetchUserLoading());
    UserApi
      .get()
      .then(res => res.results)
      .then(users => {
        dispatch(fetchUserFulfilled(users));
      })
      .catch(() => {
        dispatch(fetchUserReject());
      });
  };
};
