// @flow

import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import RestrictRoute from 'src/utils/auth/restrict-route';
import { createBrowserHistory } from 'history';

// Screens
import LoginScreen from 'src/screens/login';
import RecipesScreen from 'src/screens/recipes';

export const history = createBrowserHistory();

class AppRouter extends React.Component {
  static displayName = 'AppRouter';

  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route path="/login" component={LoginScreen} />
          <RestrictRoute path="/recipes" component={RecipesScreen} />
        </div>
      </ConnectedRouter>
    );
  }
}

export default AppRouter;
