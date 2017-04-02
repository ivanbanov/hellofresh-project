// @flow

import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from 'src/reducers/auth';

const reducers = combineReducers({
  authReducer,
});

export default createStore(
  reducers,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : fn => fn
  )
);
