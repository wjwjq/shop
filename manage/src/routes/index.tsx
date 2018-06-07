import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageLoading from '../Components/Loading';
import Loadable from 'react-loadable';

import App from '../views/App/';

const Foo = Loadable({
  loader: () => import(/* webpackChunkName: Foo */ '../views/Foo'),
  loading: PageLoading
});

const Hello = Loadable({
  loader: () => import(/* webpackChunkName: Hello */ '../views/Hello'),
  loading: PageLoading
});

const Routes = () => {
  return (
    <App>
      <Switch>
        <Route path="/user-manage" component={Foo} />
        <Route path="/goods-manage" component={Hello} />
      </Switch>
    </App>
  );
};

export default Routes;
