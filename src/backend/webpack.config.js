const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const ROOT_PATH = resolve(__dirname)
const APP_PATH = resolve(ROOT_PATH, 'app')
const BUILD_PATH = resolve(ROOT_PATH, 'dist')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: [resolve(APP_PATH, 'index.js')],
    vendor: [
      'moment',
      'history',
      'prop-types',
      'react',
      'react-dom',
      'react-router-dom',
      'react-redux',
      'react-router-redux',
      'react-transition-group',
      'react-fontawesome',
      'react-router-bootstrap',
      'react-bootstrap',
      'redux',
      'redux-thunk',
      'draft-js',
      'draft-js-export-html',
      'draft-js-import-html',
      'isomorphic-fetch',
      'uxcore'
    ]
  },
  output: {
    filename: '[name]-[hash].min.js',
    path: BUILD_PATH,
    publicPath: '/',
    chunkFilename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: APP_PATH,
        loader: 'eslint-loader',
        options: { failOnError: true }
      },
      {
        test: /\.(js|jsx)$/,
        include: APP_PATH,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        include: APP_PATH,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        include: APP_PATH,
        use: ExtractTextPlugin.extract(['css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('precss'),
                require('autoprefixer')
              ]
            }
          }
        }, 'sass-loader'])
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        include: APP_PATH,
        loader: 'url-loader?limit=8192&name=img/[name].[hash].[ext]'
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        exclude: /node_modules/,
        include: APP_PATH,
        loader: 'url-loader?prefix=font/&limit=8192&name=font/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [
      resolve(ROOT_PATH, 'node_modules'),
      APP_PATH
    ],
    alias: {
      'actions': resolve(APP_PATH, 'actions'),
      'components': resolve(APP_PATH, 'components'),
      'containers': resolve(APP_PATH, 'containers'),
      'reducers': resolve(APP_PATH, 'reducers'),
      'utils': resolve(APP_PATH, 'utils')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
      ie8: true
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new HtmlWebpackPlugin({
      title: '管理系统',
      keywords: '管理系统',
      description: '管理系统',
      favicon: resolve(APP_PATH, 'assets/favicon.ico'),
      template: resolve(APP_PATH, 'index.tpl.html')
    })
  ]
}