import { ACTIONS } from 'src/constants';

export function login(user: Object, token: string): Object {
  window.localStorage.setItem('token', token);

  return {
    type: ACTIONS.LOGIN,
    user,
  };
}

export function logout(): void {
  window.localStorage.removeItem('token');

  return { type: ACTIONS.LOGOUT };
}

