// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './ui/styles/setup.styl';

import Col from './ui/components/col';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={() => (<Col>Login</Col>)} />
          <Route path="/recipes" component={() => (<h1>Recipes</h1>)} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
