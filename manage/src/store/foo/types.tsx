import * as constants from './constants';
import { Action } from 'redux';

export interface IUser {
  '_id': string | number;
  id: string | number;
  name: string;
  age: number;
  address: string;
}

export type TUsers = IUser[];

export interface IFooState {
  loading?: boolean;
  fail?: boolean;
  success?: boolean;
  users?: TUsers;
}

export interface IFetchUser extends Action {
  type: constants.FETCH_USERS;
  payload: IFooState;
}

export interface IFetchUserReject extends Action {
  type: constants.FETCH_USERS_REJECT;
  payload: IFooState;
}

export interface IFetchUserFulfilled extends Action {
  type: constants.FETCH_USERS_FULFILLED;
  payload: IFooState;
}

export type FetchUserActions = IFetchUser | IFetchUserReject | IFetchUserFulfilled;
