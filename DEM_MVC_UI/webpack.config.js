/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const PostcssInitial = require('postcss-initial');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const checksum = require('checksum');
const cssnano = require('cssnano');

let debug = process.env.NODE_ENV==='production' ? false : true;

//For all environments
let entry = {
  vendor: [
    'babel-polyfill',
    'react',
    'react-dom',
    'raven-js',
    'react-notification-system',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-saga'
  ],
  js: ['./src/scripts/index']
};
if(debug){
  // DEVELOPMENT
  entry.vendor.push('webpack-hot-middleware/client?reload=true');
}

//For all environments
let output = {filename: 'js/bundle.js?[chunkhash]'};
            // {debug ? DEVELOPMENT : PRODUCTION}
output.path = debug ? '/' : path.join(__dirname, '../DEM_MVC/wwwroot');
output.publicPath = debug ? '/' : '/wwwroot/';

//For all environments
let rules = [{
    test: /\.js$/,
    exclude: /(node_modules)/,
    include: path.join(__dirname, './src'),
    use: ['babel-loader']
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
    enforce: 'pre',
    include: path.join(__dirname, './src')
  },{
    test: /\.scss$/,
    use: [
      'style-loader',
      //'css-loader?modules&importLoaders=1&localIdentName=[local]',
      'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      'postcss-loader',
      'resolve-url-loader',
      'sass-loader?sourceMap'
    ]
  });
} else {
  // PRODUCTION
  rules.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: 'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]&sourceMap!postcss-loader!resolve-url-loader!sass-loader?sourceMap'
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
    browsers: ['> 1%', 'last 2 versions'],
    cascade: false
  }),
  PostcssInitial({
    reset: 'inherited' // reset only inherited rules
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
  template: path.join(__dirname, './src/index.html'),
};
if(!debug){
  // PRODUCTION
  htmlWebpackPluginSettings.path = path.join(__dirname, '../DEM_MVC/wwwroot');
  htmlWebpackPluginSettings.publicPath = '/wwwroot/';
  htmlWebpackPluginSettings.paceCss = '/wwwroot/css/pace.css?' + checksum('./node_modules/pace-progress/themes/orange/pace-theme-flash.css');
  htmlWebpackPluginSettings.paceJs = '/wwwroot/js/pace.min.js?' + checksum('./node_modules/pace-progress/pace.min.js');
}

//For all environments
let plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'js/vendor.bundle.js?[chunkhash]'
  }),
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
      output: {path: './'},
      resolveLoader: {
        alias: {
          'images': __dirname + './src/images',
        },
      },
      sassLoader: {
        includePaths: [path.resolve(__dirname, './src/scripts/_commonScss')]
      },
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
      filename: 'css/bundle.min.css?[hash]'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false},
      sourceMap: true
  }),
    new CopyWebpackPlugin([
      { from: './node_modules/pace-progress/themes/orange/pace-theme-flash.css', to: 'css/pace.css' },
      { from: './node_modules/pace-progress/pace.min.js', to: 'js/pace.min.js' },
    ], {
        copyUnmodified: false
    })
  );
}

//For all environments
module.exports = {
  devtool: debug ? 'cheap-eval-source-map' : 'source-map',
  entry: entry,
  target: 'web',
  output: output,
  module: {
    rules: rules
  },
  plugins: plugins
};
