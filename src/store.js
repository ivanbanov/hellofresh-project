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

const reducers = combineReducers({
  authReducer,
});

export default createStore(
  connectRouter(history)(reducers),
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    ),
    window.devToolsExtension ? window.devToolsExtension() : fn => fn
  )
);
