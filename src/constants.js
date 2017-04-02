const actions: Array<string> = [
  'LOGIN',
  'LOGOUT',
];

// Constants creator
export const ACTIONS = actions.reduce((obj, action) => ({
  ...obj,
  [action]: action,
}), {});
