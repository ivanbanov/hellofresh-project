import { ACTIONS } from 'src/constants';

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
