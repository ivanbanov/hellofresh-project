const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./config.js');

const PORT = 3000;
const app = express();

const PATHS = require('./paths');

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  path: config.output.path,
  publicPath: config.output.publicPath,
  hot: true,
  contentBase: PATHS.src,
  stats: 'minimal',
});

const distIndexFile = `${PATHS.dist}/index.html`;

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', (req, res) => {
  res.write(middleware.fileSystem.readFileSync(distIndexFile));
  res.end();
});

app.listen(PORT, 'localhost', err => {
  if (err) {
    console.log(err);
  }

  console.info(`🌎  Listening on port ${PORT}`);
});
