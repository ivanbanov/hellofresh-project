import { ACTIONS } from 'src/constants';
import session from 'src/utils/auth/session';

export function login(user: Object, token: string): Object {
  session.authenticate({
    user,
    token,
  });

  return {
    type: ACTIONS.LOGIN,
    user,
  };
}

export function logout(): void {
  session.expire();

  return { type: ACTIONS.LOGOUT };
}
