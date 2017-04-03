// @flow

import { history } from 'src/router';

function _getApiInstance(): Object {
  return require('src/api');
}

function getToken(): string {
  return window.localStorage.getItem('token');
}

function authenticate(token: string): void {
  window.localStorage.setItem('token', token);
  _getApiInstance().defaults.headers.common.token = token;
}

function expire(): void {
  window.localStorage.removeItem('token');
  _getApiInstance().defaults.headers.common.token = null;

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
