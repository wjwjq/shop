import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageLoading from '../Components/Loading';
import Loadable from 'react-loadable';

import App from '../views/App/';

const Foo = Loadable({
  /* webpackChunkName: Foo */
  loader: () => import('../views/Foo'),
  loading: PageLoading
});

const Hello = Loadable({
  /* webpackChunkName: Hello */
  loader: () => import('../views/Hello'),
  loading: PageLoading
});

const UserManage = Loadable({
  /* webpackChunkName: UserManage */
  loader: () => import('../views/UserManage'),
  loading: PageLoading
});

const Routes = () => {
  return (
    <App>
      <Switch>
        <Route path="/user-manage" component={UserManage} />
        <Route path="/goods-manage" component={Hello} />
        <Route path="/foo" component={Foo} />
      </Switch>
    </App>
  );
};

export default Routes;
