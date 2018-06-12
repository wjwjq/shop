
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import store, { history } from './store';
import Routes from './routes/index';

import './assets/styles/index.less';

const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  rootEl
);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
  module.hot.accept('./routes/index', () => {
    render(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}
