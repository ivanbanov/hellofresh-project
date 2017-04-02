import axios from 'axios';

const api = axios.create({
  baseURL: '//localhost:3001/',
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});

export default api;
