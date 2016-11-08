/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

const webpack = require('webpack');
const path = require('path');
const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)

};

module.exports = {
  devtool: "cheap-eval-source-map",
  entry: [
    "babel-polyfill",
    `bootstrap-loader/lib/bootstrap.loader?configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`,
    "webpack-hot-middleware/client?reload=true",
    "./src/scripts/index"
  ],
  target: "web",
  output: {
    path: '/',
    publicPath: 'http://localhost:60782/',
    filename: "dem.min.js?[hash]"
  },
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        use: 'eslint-loader',
        enforce: "pre",
        include: path.join(__dirname, "./src")
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, "./src"),
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, "./src"),
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'url-loader?limit=8192&name=images/[name]-[hash].[ext]'
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
          return [Autoprefixer({
            browsers: ["> 1%", "last 2 versions"],
            cascade: false
          })];
        },
        eslint: {
          failOnWarning: false,
          failOnError: true
        }
      }
    }),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      filename: 'index.html',
      template: path.join(__dirname, "./src/index.html")
    })
  ]
};
