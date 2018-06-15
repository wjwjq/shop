import { Action } from 'redux';

export const enum ActionsEnum  {
  FETCH_USERS =  '@@foo/FETCH_USERS',
  FETCH_USERS_REJECT = '@@foo/FETCH_USERS_REJECT',
  FETCH_USERS_FULFILLED = '@@foo/FETCH_USERS_FULFILLED'
}

export interface User {
  '_id': string | number;
  id: string | number;
  name: string;
  age: number;
  address: string;
}

export type Users = User[];

export interface FooState {
  loading?: boolean;
  fail?: boolean;
  success?: boolean;
  users?: Users;
}

export interface FetchUser extends Action {
  type: ActionsEnum.FETCH_USERS;
  payload: FooState;
}

export interface FetchUserReject extends Action {
  type: ActionsEnum.FETCH_USERS_REJECT;
  payload: FooState;
}

export interface FetchUserFulfilled extends Action {
  type: ActionsEnum.FETCH_USERS_FULFILLED;
  payload: FooState;
}

export type ActionType = ActionsEnum.FETCH_USERS | ActionsEnum.FETCH_USERS_REJECT | ActionsEnum.FETCH_USERS_FULFILLED;

export type FooActions = FetchUser | FetchUserReject | FetchUserFulfilled;
