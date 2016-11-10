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

let debug = process.env.NODE_ENV==='production' ? false : true;

//For all environments
let entry = [
  "babel-polyfill",                   // {debug ? DEVELOPMENT : PRODUCTION}
  `bootstrap-loader/lib/bootstrap.loader?${debug?'':'extractStyles&'}configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`
];
if(debug){
  // DEVELOPMENT
  entry.push("webpack-hot-middleware/client?reload=true");
}
entry.push("./src/scripts/index");

//For all environments
let output = {filename: "dem.min.js?[hash]"};
            // {debug ? DEVELOPMENT : PRODUCTION}
output.path = debug ? "/" : path.join(__dirname, "../DEM_MVC/wwwroot");
output.publicPath = debug ? "/" : '/wwwroot/';

//For all environments
let rules = [{
    test: /\.js$/,
    exclude: /(node_modules)/,
    include: path.join(__dirname, "./src"),
    use: ["babel-loader"]
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: 'url-loader?limit=8192&name=images/[name]-[hash].[ext]'
  }];

if(debug){
  // DEVELOPMENT
  rules.push({
    test: /\.jsx$|\.js$/,
    use: 'eslint-loader',
    enforce: "pre",
    include: path.join(__dirname, "./src")
  },{
    test: /\.scss$/,
    include: path.join(__dirname, "./src"),
    use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
  });
} else {
  // PRODUCTION
  rules.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: "style-loader",
      loader: "css-loader?sourceMap!postcss-loader!sass-loader?sourceMap"
    })
  });
}

//For all environments
let eslint = {
  failOnWarning: false,
  failOnError: true
};

let postcss = [
  Autoprefixer({
    browsers: ["> 1%", "last 2 versions"],
    cascade: false
  })
];

if(!debug){
  // PRODUCTION
  postcss.push(
    cssnano({
      discardComments: {
        removeAll: true
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true
    })
  );
}

//For all environments
let htmlWebpackPluginSettings = {
  hash: !debug,
  filename: 'index.html',
  template: path.join(__dirname, "./src/index.html"),
};
if(!debug){
  // PRODUCTION
  htmlWebpackPluginSettings.path = path.join(__dirname, "../DEM_MVC/wwwroot");
  htmlWebpackPluginSettings.publicPath = '/wwwroot/';
  htmlWebpackPluginSettings.paceCss = '/wwwroot/pace.css?' + checksum('./node_modules/pace-progress/themes/orange/pace-theme-flash.css');
  htmlWebpackPluginSettings.paceJs = '/wwwroot/pace.min.js?' + checksum('./node_modules/pace-progress/pace.min.js');
}

//For all environments
let plugins = [
  new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }
  ),
  new webpack.LoaderOptionsPlugin({
    debug: debug,
    noInfo: !debug,
    options: {
      context: __dirname,
      output: {path: "./"},
      postcss: function () {
        return postcss;
      },
      eslint: eslint
    }
  }),
  new HtmlWebpackPlugin(htmlWebpackPluginSettings)
];

if(debug){
  // DEVELOPMENT
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  // PRODUCTION
  plugins.push(
    new webpack.NoErrorsPlugin(),
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
    })
  );
}

//For all environments
module.exports = {
  devtool: debug ? "cheap-eval-source-map" : "source-map",
  entry: entry,
  target: "web",
  output: output,
  module: {
    rules: rules
  },
  plugins: plugins
};