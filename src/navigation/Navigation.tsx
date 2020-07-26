import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Login from '../modules/login/Login';

import HomePage from '../modules/homepage/HomePage';

export class Navigation extends React.Component<any, any> {
  public render() {
    const error = (props: any) => <div>Page not found</div>
    return (
      <Suspense fallback={null} >
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
          <Route path="*" exact={true} render={error} />
        </Switch>
      </Suspense>
    );
  }
}

export default withRouter(Navigation);
