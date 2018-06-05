import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './redux/store/index';

import Routes from './Routes/index';

const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <Provider store={store}>
        <Routes />
    </Provider>
  </AppContainer>,
  rootEl
);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
  module.hot.accept('./Routes/index', () => {
    render(
      <AppContainer>
        <Provider store={store}>
            <Routes />
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}
