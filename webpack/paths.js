const path = require('path');

const ROOT_PATH = path.join(__dirname, '/..');
const PUBLIC_PATH = '/';
const PATHS = {
  root: ROOT_PATH,
  src: `${ROOT_PATH}/src`,
  dist: `${ROOT_PATH}/dist`,
  webpack: __dirname,
};

module.exports = {
  PATHS,
  PUBLIC_PATH
};
