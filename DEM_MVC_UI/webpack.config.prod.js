/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import checksum from 'checksum';
import cssnano from 'cssnano';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'paceCssHash': checksum('./node_modules/pace-progress/themes/orange/pace-theme-flash.css'),
  'paceJsHash': checksum('./node_modules/pace-progress/pace.min.js')

};

const bootstrapDevEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?' +
          `extractStyles&configFilePath=${__dirname}/.bootstraprc` +
          '!bootstrap-loader/no-op.js';

export default {
  debug: true,
  devtool: "source-map",
  noInfo: false,
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
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, "./src"),
        loaders: ["babel"]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: { loader: "style-loader" },
          loader: { loader: "css-loader?sourceMap!postcss-loader!sass-loader?sourceMap" }
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'images/[name]-[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      //aditional options: https://github.com/lodash/lodash-webpack-plugin#feature-sets
      'shorthands':true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('dem.min.css'),
    new webpack.optimize.DedupePlugin(),
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
  ],
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
        safe: true,
        sourcemap: true
     })
    ];
  },
  eslint: {
      failOnWarning: false,
      failOnError: true
  }
};
