// @flow

import React from 'react';
import AppRouter from 'src/router';
import { Helmet } from 'react-helmet';
import favicon from 'src/ui/assets/images/favicon.png';
import 'src/ui/styles/setup.styl';

// Redux
import { Provider } from 'react-redux';
import store from 'src/store';

class App extends React.Component {
  static displayName = 'App';

  render() {
    return (
      <div>
        <Helmet>
          <link rel="icon" type="image/x-icon" href={favicon}  />
          <link rel="shortcut icon" type="image/x-icon" href={favicon}  />
        </Helmet>

        <Provider store={store}>
          <AppRouter />
        </Provider>
      </div>
    );
  }
}

export default App;
