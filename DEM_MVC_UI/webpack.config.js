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

let entry = [
  "babel-polyfill",
  `bootstrap-loader/lib/bootstrap.loader?${!debug?'extractStyles&':''}configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`
];
if(debug){
  entry.push("webpack-hot-middleware/client?reload=true");
}
entry.push("./src/scripts/index");

let output = {filename: "dem.min.js?[hash]"};
output.path = debug ? "/" : path.join(__dirname, "../DEM_MVC/wwwroot");
output.publicPath = debug ? "/" : '/wwwroot/';

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
  rules.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: "style-loader",
      loader: "css-loader?sourceMap!postcss-loader!sass-loader?sourceMap"
    })
  });
}

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

let htmlWebpackPluginSettings = {
  hash: !debug,
  filename: 'index.html',
  template: path.join(__dirname, "./src/index.html"),
};
if(!debug){
  htmlWebpackPluginSettings.path = path.join(__dirname, "../DEM_MVC/wwwroot");
  htmlWebpackPluginSettings.publicPath = '/wwwroot/';
  htmlWebpackPluginSettings.paceCss = '/wwwroot/pace.css?' + checksum('./node_modules/pace-progress/themes/orange/pace-theme-flash.css');
  htmlWebpackPluginSettings.paceJs = '/wwwroot/pace.min.js?' + checksum('./node_modules/pace-progress/pace.min.js');
}


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
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
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
