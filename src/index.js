// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './ui/setup.styl';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={() => (<h1>Login</h1>)} />
          <Route path="/recipes" component={() => (<h1>Recipes</h1>)} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
