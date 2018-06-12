import { Action } from 'redux';

export enum ActionsEnum  {
  FETCH_USERS =  '@@foo/FETCH_USERS',
  FETCH_USERS_REJECT = '@@foo/FETCH_USERS_REJECT',
  FETCH_USERS_FULFILLED = '@@foo/FETCH_USERS_FULFILLED'
}

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
  type: ActionsEnum.FETCH_USERS;
  payload: IFooState;
}

export interface IFetchUserReject extends Action {
  type: ActionsEnum.FETCH_USERS_REJECT;
  payload: IFooState;
}

export interface IFetchUserFulfilled extends Action {
  type: ActionsEnum.FETCH_USERS_FULFILLED;
  payload: IFooState;
}

export type TFooActions = IFetchUser | IFetchUserReject | IFetchUserFulfilled;
