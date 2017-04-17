import { ACTIONS } from 'src/constants';
import { history } from 'src/router';
import api from 'src/api';
import session from 'src/utils/auth/session';

function loginSuccess(user: Object): Object {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    payload: { user },
  };
}

function loginFail(error: string): Object {
  return {
    type: ACTIONS.LOGIN_FAIL,
    payload: { error },
  };
}

export function login(
  userData: {
    email: string,
    password: string,
  },
  success: Function = () => null,
  error: Function = () => null,
): Promise {
  const {
    email,
    password,
  } = userData;

  return async (dispatch: Function) => {
    dispatch({ type: ACTIONS.LOGIN });

    try {
      const response: Object = await api.post('/login', { email, password });
      const { token, user } = response.data;

      session.authenticate({
        user,
        token,
      });

      dispatch(loginSuccess(user));
      success(user);
    } catch (e) {
      const errorMessage = (e && e.response) ? e.response.data.message : e;

      dispatch(loginFail(e));
      error(errorMessage);
    }
  };
}

export function logout(): Object {
  session.expire();
  history.push('/login');

  return { type: ACTIONS.LOGOUT };
}
