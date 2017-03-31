const path = require('path');

const ROOT_PATH = path.join(__dirname, '/..');
const PATHS = {
  base: ROOT_PATH,
  src: `${ROOT_PATH}/src`,
  public: `${ROOT_PATH}/public`,
  dist: `${ROOT_PATH}/dist`,
  webpack: __dirname,
};

module.exports = PATHS;
