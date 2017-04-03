// @flow

import { history } from 'src/router';

const TOKEN_NAME = 'hellofresh-session';

function _getApiInstance(): Object {
  return require('src/api').default;
}

function getToken(): string {
  return window.localStorage.getItem(TOKEN_NAME);
}

function authenticate(token: string): void {
  window.localStorage.setItem(TOKEN_NAME, token);
  _getApiInstance().defaults.headers.token = token;
}

function expire(): void {
  window.localStorage.removeItem(TOKEN_NAME);
  _getApiInstance().defaults.headers.token = null;

  history.push('/login');
}

function isAuthenticated(): boolean {
  return !!getToken();
}

export default {
  authenticate,
  expire,
  getToken,
  isAuthenticated,
};
