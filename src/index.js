// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import 'src/ui/styles/setup.styl';

import LoginScreen from 'src/screens/login';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={LoginScreen} />
          <Route path="/recipes" component={() => (<h1>Recipes</h1>)} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
