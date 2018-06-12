import { combineReducers, Dispatch, Reducer } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

import { IFooState, TFooActions } from './foo/types';
import { IHelloState, THelloAction } from './hello/types';

import helloReducers, { initialState as helloInitialState } from './hello/reducers';
import fooReducers, { initialState as fooInitialState } from './foo/reducers';

// The top-level state object
export interface ApplicationState {
  router: any;
  foo: IFooState;
  hello: IHelloState;
}

export type ApplicationActions = THelloAction | TFooActions;

export const ApplicationInitialState = {
  router: {},
  foo: fooInitialState,
  hello: helloInitialState
};

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  router: routerReducer,
  hello: helloReducers,
  foo: fooReducers
});
