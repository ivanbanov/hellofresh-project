const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pathsObj = require('./paths');

const PATHS = pathsObj.PATHS;
const PUBLIC_PATH = pathsObj.PUBLIC_PATH;

module.exports = {
  devtool: 'source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?http://localhost:3000/',
    `${PATHS.src}/index.js`,
  ],

  output: {
    path: PATHS.dist,
    publicPath: PUBLIC_PATH,
    filename: '[name].js',
  },

  resolve: {
    alias: {
      src: PATHS.src,
    },
    modules: [
      `${PATHS.src}/ui`,
      `${PATHS.root}/node_modules`,
    ],
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
      //         configFile: `${PATHS.root}/.eslintrc`,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              extends: `${PATHS.root}/.babelrc`,
            },
          },
        ],
      },
      {
        test: /\.(css|styl)$/,
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
                import: ['~styles/setup'],
                paths: [
                  `${PATHS.src}/ui`,
                  `${PATHS.src}/screens`,
                ],
              },
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
    }),
  ],
};
