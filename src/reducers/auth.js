import { ACTIONS } from 'src/constants';

type State = {
  user: Object,
  error: ?string,
};

const initialState: State = {
  user: {},
  error: null,
};

export default function loggin(
  state: State = initialState,
  action: { payload: any },
): State {
  const { payload } = action;

  switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS: {
      return {
        user: payload.user,
        error: null,
      };
    }

    case ACTIONS.LOGIN_FAIL: {
      return {
        user: {},
        error: payload.error,
      };
    }

    case ACTIONS.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
