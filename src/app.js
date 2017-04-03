// @flow

import React from 'react';
import AppRouter from 'src/router';
import 'src/ui/styles/setup.styl';

// Redux
import { Provider } from 'react-redux';
import store from 'src/store';

class App extends React.Component {
  static displayName = 'App';

  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
