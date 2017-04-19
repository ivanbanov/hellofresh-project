import { ACTIONS } from 'src/constants';

type State = {
  recipes: Array<Object>,
  rateds: Object,
  favorites: Object,
};

const initialState: State = {
  recipes: [],
  ratings: {},
  favorites: {},
};

export default function loggin(
  state: State = initialState,
  action: Object = {}
): State {
  switch (action.type) {
    case ACTIONS.FETCH_RECIPES: {
      const nextState = { ...state };
      const { payload } = action;
      nextState.recipes = payload.recipes;

      return nextState;
    }

    case ACTIONS.SET_FAVORITE: {
      const nextState = { ...state };
      const { payload } = action;
      const isFavorite = state.favorites[payload.id];

      nextState.favorites = {
        ...state.favorites,
        [payload.id]: !isFavorite,
      };

      return nextState;
    }

    case ACTIONS.SET_RATING: {
      const nextState = { ...state };
      const { payload } = action;

      nextState.ratings = {
        ...state.ratings,
        [payload.id]: payload.value,
      };

      return nextState;
    }

    default: {
      return state;
    }
  }
}
