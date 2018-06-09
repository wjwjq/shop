import * as constants from '../constants/foo';

export interface IUser {
  '_id': string | number;
  id: string | number;
  name: string;
  age: number;
  address: string;
}

export type TUsers = IUser[];

export interface IStoreState {
  loading?: boolean;
  fail?: boolean;
  success?: boolean;
  users?: TUsers;
}

export interface IFetchUser {
  type: constants.FETCH_USERS;
  payload: IStoreState;
}

export interface IFetchUserReject {
  type: constants.FETCH_USERS_REJECT;
  payload: IStoreState;
}

export interface IFetchUserFulfilled {
  type: constants.FETCH_USERS_FULFILLED;
  payload: IStoreState;
}

export type FetchUserActions = IFetchUser | IFetchUserReject | IFetchUserFulfilled;
