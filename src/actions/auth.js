import { ACTIONS } from 'src/constants';
import session from 'src/utils/auth/session';

export function login(user: Object, token: string): Object {
  session.authenticate(token);

  return {
    type: ACTIONS.LOGIN,
    user,
  };
}

export function logout(): void {
  session.expire();

  debugger;

  return { type: ACTIONS.LOGOUT };
}
