// @flow

import isEmail from '../is-email';

describe('validators/is-email', () => {
  it('should return true if email is valid', () => {
    expect(isEmail('user@site.com')).toEqual(true);
    expect(isEmail('user.xxx@site.com')).toEqual(true);
    expect(isEmail('user.xxx+123@site.com')).toEqual(true);
    expect(isEmail('user@xxx.online')).toEqual(true);
  });

  it('should return false value if email is not valid', () => {
    expect(isEmail('@.com')).toEqual(false);
    expect(isEmail('user@site')).toEqual(false);
  });
});
