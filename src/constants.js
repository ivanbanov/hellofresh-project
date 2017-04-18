const actions: Array<string> = [
  'LOGIN',
  'LOGIN_FAIL',
  'LOGIN_SUCCESS',
  'LOGOUT',
  'FETCH_RECIPES',
  'SET_FAVORITE',
  'SET_RATING',
];

// Constants creator
export const ACTIONS = actions.reduce((obj, action) => ({
  ...obj,
  [action]: action,
}), {});
