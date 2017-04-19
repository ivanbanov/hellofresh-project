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
import recipesReducer from 'src/reducers/recipes';
import session from 'src/utils/auth/session';

const appReducer: Function = combineReducers({
  authReducer,
  recipesReducer,
});

const rootReducer: Function = (state, action) => {
  let _state = state;

  if (action.type === 'LOGOUT') {
    _state = undefined;
  }

  return appReducer(_state, action);
};

export default createStore(
  connectRouter(history)(rootReducer),
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
