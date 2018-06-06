
import * as React from 'react';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';

import App from '../views/App';
import Foo from '../views/Foo';

const Routes = () => {
  return (
      <Switch>
        <Route path="/foo" component={Foo} />
        <Route path="/" component={App} />
      </Switch>
  );
};

export default Routes;
