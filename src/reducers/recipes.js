import { ACTIONS } from 'src/constants';

type State = {};

const initialState: State = {};

export default function loggin(
  state: State = initialState,
  action: Object = {}
): State {
  switch (action.type) {
    case ACTIONS.SET_FAVORITE: {
      const recipe = state[action.id];
      const isFavorite = recipe && recipe.isFavorite;

      return {
        ...state,
        [action.id]: {
          ...recipe,
          isFavorite: !isFavorite,
        },
      };
    }

    case ACTIONS.SET_RATING: {
      const recipe = state[action.id];

      return {
        ...state,
        [action.id]: {
          ...recipe,
          rating: action.value,
          didSetStars: true,
        },
      };
    }

    default: {
      return state;
    }
  }
}
