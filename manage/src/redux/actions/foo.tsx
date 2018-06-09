// import { Action, ActionCreator } from 'redux';
// import { ThunkAction } from 'redux-thunk';

import { Dispatch } from 'react-redux';

import * as constants from '../constants/foo';
import * as Types from '../types/foo';

import { user as UserApi } from '../../lib/api';

function fetchUserLoading(): Types.IFetchUser {
  return {
    type: constants.FETCH_USERS,
    payload: {
      loading: true,
      fail: false,
      success: false
    }
  };
}

function fetchUserReject(): Types.IFetchUserReject {
  return {
    type: constants.FETCH_USERS_REJECT,
    payload: {
      loading: false,
      fail: true,
      success: false
    }
  };
}

function fetchUserFulfilled(users: Types.TUsers): Types.IFetchUserFulfilled {
  return {
    type: constants.FETCH_USERS_FULFILLED,
    payload: {
      users,
      loading: true,
      fail: false,
      success: true
    }
  };
}

export function fetchUser() {
  return async (dispatch: Dispatch<Types.FetchUserActions>): Promise<any> => {
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
