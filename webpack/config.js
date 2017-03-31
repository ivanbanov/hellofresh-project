const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const PATHS = require('./paths');

module.exports = {
  devtool: 'source-map',
  entry: [
    hotMiddlewareScript,
    `${PATHS.src}/index.js`,
  ],
  output: {
    path: PATHS.dist,
    publicPath: PATHS.public,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: `${PATHS.webpack}/.eslintrc`,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              extends: `${PATHS.webpack}/.babelrc`,
            },
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              'include css': true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
    }),
  ],
};
