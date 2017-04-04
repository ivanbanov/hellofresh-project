// @flow

import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';
import { history } from 'src/router';
import authReducer from 'src/reducers/auth';
import session from 'src/utils/auth/session';

const reducers = combineReducers({
  authReducer,
});

export default createStore(
  connectRouter(history)(reducers),
  {
    authReducer: {
      user: JSON.parse(session.getData('user')) || {},
    },
  },
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    ),
    window.devToolsExtension ? window.devToolsExtension() : fn => fn
  )
);
