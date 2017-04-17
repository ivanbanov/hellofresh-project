import { ACTIONS } from 'src/constants';
import { history } from 'src/router';
import api from 'src/api';
import session from 'src/utils/auth/session';

function loginSuccess(user) {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    payload: { user },
  };
}

function loginFail(error) {
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
): Object {
  const {
    email,
    password,
  } = userData;

  return async (dispatch) => {
    dispatch({ type: ACTIONS.LOGIN });

    try {
      const response = await api.post('/login', { email, password });
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

export function logout(): void {
  session.expire();
  history.push('/login');

  return { type: ACTIONS.LOGOUT };
}
