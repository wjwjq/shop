import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';

import { ApplicationState, ApplicationInitialState, ApplicationActions, reducers } from './reducer';

declare let window: { __REDUX_DEVTOOLS_EXTENSION__: any };
declare let process: any;

function configureStore( hhistory: History, initialState: ApplicationState): Store<ApplicationState> {
  const historyMiddleware = routerMiddleware(hhistory);

  let middlewares;
  if (process.env.NODE_ENV === 'development') {
    middlewares = compose(
      applyMiddleware(
        historyMiddleware,
        promiseMiddleware(),
        thunkMiddleware,
        createLogger()
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    middlewares = applyMiddleware(
      historyMiddleware,
      promiseMiddleware(),
      thunkMiddleware
    );
  }

  return createStore<ApplicationState, ApplicationActions, {}, {}>(
    reducers,
    initialState,
    middlewares
  );
}

export const history = createBrowserHistory();
export default configureStore(history, ApplicationInitialState);
