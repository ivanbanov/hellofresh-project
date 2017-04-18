import { ACTIONS } from 'src/constants';
import api from 'src/api';

function fetchRecipes(): Object {
  return {
    type: ACTIONS.FETCH_RECIPES,
  };
}

export function getRecipes(): Function {
  return (dispatch) => {
    dispatch(fetchRecipes());
    return api.get('/recipes');
  };
}

export function setFavorite(id: string): Object {
  return {
    type: ACTIONS.SET_FAVORITE,
    id,
  };
}

export function setRating(id: string, value: number): Object {
  return {
    type: ACTIONS.SET_RATING,
    id,
    value,
  };
}
