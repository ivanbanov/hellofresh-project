const actions: Array<string> = [
  'LOGIN',
  'LOGIN_FAIL',
  'LOGIN_SUCCESS',
  'LOGOUT',
  'SET_FAVORITE',
  'SET_RATING',
];

// Constants creator
export const ACTIONS = actions.reduce((obj, action) => ({
  ...obj,
  [action]: action,
}), {});
