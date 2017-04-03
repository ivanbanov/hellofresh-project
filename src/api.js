// @flow

import axios from 'axios';
import session from 'src/utils/auth/session';

const api = axios.create({
  baseURL: '//localhost:3001/',
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    token: session.getToken(),
  },
});

export default api;
