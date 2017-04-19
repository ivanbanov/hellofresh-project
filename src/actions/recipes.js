import { ACTIONS } from 'src/constants';
import api from 'src/api';

function fetchRecipes(recipes: Array<Object>): Object {
  return {
    type: ACTIONS.FETCH_RECIPES,
    payload: { recipes },
  };
}

export function getRecipes(): Promise {
  return async (dispatch) => {
    const response = await api.get('/recipes');

    dispatch(fetchRecipes(response.data.recipes));
  };
}

export function setFavorite(id: string): Object {
  return {
    type: ACTIONS.SET_FAVORITE,
    payload: { id },
  };
}

export function setRating(id: string, value: number): Object {
  return {
    type: ACTIONS.SET_RATING,
    payload: {
      id,
      value,
    },
  };
}
