import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import createBrowserHistory from 'history/createBrowserHistory';
// 引入react-router-redux以便在redux dispath中使用 push('/foo')
import { routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from '../reducers/';

export const history = createBrowserHistory();

const historyMiddleware = routerMiddleware(history);

const appReducer = combineReducers({
  ...reducers,
  routing: routerReducer
} as any);

declare let window: { __REDUX_DEVTOOLS_EXTENSION__: any };

let middlewares;
// if (process.env.NODE_ENV !== 'production') {

// } else {
//   middlewares = applyMiddleware(
//     historyMiddleware,
//     promiseMiddleware(),
//     thunkMiddleware
//   );
// }

middlewares = compose(
  applyMiddleware(
    historyMiddleware,
    promiseMiddleware(),
    thunkMiddleware,
    createLogger()
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(appReducer, middlewares);

export default store;
