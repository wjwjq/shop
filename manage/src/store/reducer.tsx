import { combineReducers, Dispatch, Reducer } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';

// Import your state types and reducers here.
import { IFooState } from './foo/types';
import { IHelloState } from './hello/types';

import helloReducers from './hello/reducers';
import fooReducers from './foo/reducers';

// The top-level state object
export interface ApplicationState {
  router: any;
  foo: IFooState;
  hello: IHelloState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  router: routerReducer,
  hello: helloReducers,
  foo: fooReducers
});
