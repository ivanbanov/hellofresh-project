const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const PATHS = require('./paths').PATHS;
const PUBLIC_PATH = require('./paths').PUBLIC_PATH;

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
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   enforce: 'pre',
      //   use: [
      //     {
      //       loader: 'eslint-loader',
      //       options: {
      //         configFile: `${PATHS.webpack}/.eslintrc`,
      //       },
      //     },
      //   ],
      // },
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
};
