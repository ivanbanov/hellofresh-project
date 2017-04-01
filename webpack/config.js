const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const pathsObj = require('./paths');
const PATHS = pathsObj.PATHS;
const PUBLIC_PATH = pathsObj.PUBLIC_PATH;
const ROOT_PATH = pathsObj.ROOT_PATH;

module.exports = {
  devtool: 'source-map',

  entry: [
    hotMiddlewareScript,
    `${PATHS.src}/index.js`,
  ],

  output: {
    path: PATHS.dist,
    publicPath: PUBLIC_PATH,
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
        test: /(\.css|\.styl)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer'),
                ],
              },
            },
            {
              loader: 'stylus-loader',
              options: {
                'include css': true,
                preferPathResolver: 'webpack',
              },
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
    }),
  ],

  resolve: {
    alias: {
      src: PATHS.src,
    },
    modules: [
      `${PATHS.src}/ui`,
      `${ROOT_PATH}/node_modules`,
    ],
  },
};
