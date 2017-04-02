// @flow

import React from 'react';
import 'src/ui/styles/setup.styl';

// Redux
import { Provider } from 'react-redux';
import store from 'src/store';

// Router
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import RestrictRoute from 'src/utils/auth/restrict-route';

// Screens
import LoginScreen from 'src/screens/login';
import RecipesScreen from 'src/screens/recipes';

const history = createBrowserHistory();

class App extends React.Component {
  static displayName = 'App';

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route path="/login" component={LoginScreen} />
            <RestrictRoute path="/recipes" component={RecipesScreen} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
