// @flow

const TOKEN_PREFIX = 'hellofresh';

const STORAGE = {
  token: `${TOKEN_PREFIX}-token`,
  user: `${TOKEN_PREFIX}-user`,
};

function _getApiInstance(): Object {
  return require('src/api').default; // eslint-disable-line
}

function getData(name: string): any {
  return window.localStorage.getItem(STORAGE[name]);
}

function setData(name: string, value: ?string | Object = null): void {
  const data = typeof value === 'object'
    ? JSON.stringify(value)
    : value;

  return window.localStorage.setItem(STORAGE[name], data);
}

function removeData(name: string): void {
  return window.localStorage.removeItem(STORAGE[name]);
}

function authenticate(data: {
  user: Object,
  token: string
}): void {
  setData('user', data.user);
  setData('token', data.token);

  const api = _getApiInstance();

  api.defaults.headers.token = data.token;
}

function expire(): void {
  removeData('token');
  removeData('user');

  const api = _getApiInstance();

  api.defaults.headers.token = null;
}

function isAuthenticated(): boolean {
  return !!getData('token');
}

export default {
  getData,
  setData,
  removeData,
  authenticate,
  isAuthenticated,
  expire,
};
