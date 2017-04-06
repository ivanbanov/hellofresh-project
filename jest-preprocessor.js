const babelJest = require('babel-jest');

module.exports = {
  process(src, filename) {
    if (/\.(css|stylus|svg)$/.test(filename)) {
      return '';
    } else if (/\.(jpg|png|gif)$/.test(filename)) {
      return JSON.stringify(filename);
    }

    return babelJest.process(src, filename);
  },
};
