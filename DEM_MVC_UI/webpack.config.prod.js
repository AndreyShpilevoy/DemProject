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

module.exports = {
  devtool: "source-map",
  entry: [
    "babel-polyfill",
    `bootstrap-loader/lib/bootstrap.loader?extractStyles&configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`,
    "./src/scripts/index"
  ],
  target: "web",
  output: {
    path: path.join(__dirname, "../DEM_MVC/wwwroot"),
    publicPath: '/wwwroot/',
    filename: "dem.min.js?[hash]"
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
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader?sourceMap!postcss-loader!sass-loader?sourceMap"
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'url-loader?limit=8192&name=images/[name]-[hash].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
      noInfo: true,
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
              safe: true
           })
          ];
        },
        eslint: {
            failOnWarning: false,
            failOnError: true
        }
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ExtractTextPlugin({
      filename: 'dem.min.css?[hash]'
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
      paceCss: '/wwwroot/pace.css?' + checksum('./node_modules/pace-progress/themes/orange/pace-theme-flash.css'),
      paceJs: '/wwwroot/pace.min.js?' + checksum('./node_modules/pace-progress/pace.min.js')
    })
  ]
};
