import { ACTIONS } from 'src/constants';
import { history } from 'src/router';
import api from 'src/api';

export function login(user: Object, token: string): Object {
  window.localStorage.setItem('token', token);

  api.defaults.headers.common.token = token;

  return {
    type: ACTIONS.LOGIN,
    user,
  };
}

export function logout(): void {
  window.localStorage.removeItem('token');
  history.push('/login');

  api.defaults.headers.common.token = null;

  return { type: ACTIONS.LOGOUT };
}
