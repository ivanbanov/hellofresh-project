import { ACTIONS } from 'src/constants';

type State = {
  user: Object,
};

const initialState: State = {
  user: false,
};

export default function loggin(
  state: State = initialState,
  action: Object = {}
): State {
  switch (action.type) {
    case ACTIONS.LOGIN: {
      return { user: action.user };
    }

    case ACTIONS.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
