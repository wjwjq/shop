import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Dispatch } from 'react-redux';

import * as Types from './types';
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

export const fetchUserAsync: ActionCreator<ThunkAction<Promise<Action>, Types.IFooState, {}, Types.TFooActions>> = () => {
  return async (dispatch: Dispatch<Types.TFooActions>): Promise<Action> => {
    try {
      dispatch(fetchUserLoading());
      const res = await UserApi.get();
      const users = await res.results;
      return dispatch(fetchUserFulfilled(users));
    } catch (err) {
      return dispatch(fetchUserReject());
    }
  };
};
