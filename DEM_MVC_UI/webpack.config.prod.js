/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const checksum = require('checksum');
const cssnano = require('cssnano');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'paceCssHash': checksum('./node_modules/pace-progress/themes/orange/pace-theme-flash.css'),
  'paceJsHash': checksum('./node_modules/pace-progress/pace.min.js')

};

const loaders = [
  {
    loader: 'css-loader?sourceMap'//,
    // options: {
    //   modules: true
    // }
  },
  {
    loader: 'postcss-loader'
  },
  {
    loader: 'sass-loader?sourceMap'
  }
];

const bootstrapDevEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?' +
          `extractStyles&configFilePath=${__dirname}/.bootstraprc` +
          '!bootstrap-loader/no-op.js';

module.exports = {
  devtool: "source-map",
  entry: [
    "babel-polyfill",
    bootstrapDevEntryPoint,
    "./src/scripts/index"
  ],
  target: "web",
  output: {
    path: path.join(__dirname, "../DEM_MVC/wwwroot"),
    publicPath: '/wwwroot/',
    filename: "dem.min.js"
  },
  devServer:{
    contantBase: "../DEM_MVC/wwwroot"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, "./src"),
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, "./src"),
        use: ["style-loader", "css-loader?sourceMap", "postcss-loader", "sass-loader?sourceMap"]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: loaders
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'url-loader?limit=8192&name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      noInfo: false,
      options: {
        context: __dirname,
        output: {
            path: "./"
        },
        postcss: function () {
          return [
            Autoprefixer({
              browsers: ["> 1%", "last 2 versions"],
              cascade: false
            }),
            cssnano({
              discardComments: {
                removeAll: true
              },
              discardUnused: false,
              mergeIdents: false,
              reduceIdents: false,
              safe: true//,
              //sourcemap: true
           })
          ];
        },
        eslint: {
            failOnWarning: false,
            failOnError: true
        }
      }
    }),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin({
      filename: 'dem.min.css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false},
      sourceMap: true
  }),
    new CopyWebpackPlugin([
      { from: './node_modules/pace-progress/themes/orange/pace-theme-flash.css', to: 'pace.css' },
      { from: './node_modules/pace-progress/pace.min.js', to: 'pace.min.js' },
    ], {
        copyUnmodified: false
    }),
    new HtmlWebpackPlugin({
      hash: true,
      path: path.join(__dirname, "../DEM_MVC/wwwroot"),
      publicPath: '/wwwroot/',
      filename: 'index.html',
      template: path.join(__dirname, "./src/index.html"),
      paceCss: '/wwwroot/pace.css?' + GLOBALS.paceCssHash,
      paceJs: '/wwwroot/pace.min.js?' + GLOBALS.paceJsHash
    })
  ]
};
