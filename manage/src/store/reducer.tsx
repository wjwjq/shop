import { combineReducers, Dispatch, Reducer } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

import { FooState, FooActions } from './foo/types';
import { HelloState, HelloAction } from './hello/types';

import helloReducers, { initialState as helloInitialState } from './hello/reducers';
import fooReducers, { initialState as fooInitialState } from './foo/reducers';

// The top-level state object
export interface ApplicationState {
  router: any;
  foo: FooState;
  hello: HelloState;
}

export type ApplicationActions = HelloAction | FooActions;

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
