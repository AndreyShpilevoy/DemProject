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

const debug = process.env.NODE_ENV==='production' ? false : true;

//For all environments
const entryPoints = {
  vendor: [
    'babel-polyfill',
    'raven-js',
    'react',
    'react-dom',
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
  entryPoints.vendor.push('webpack-hot-middleware/client?reload=true');
}

//For all environments
const output = {filename: 'js/bundle.js?[hash]'};
            // {debug ? DEVELOPMENT : PRODUCTION}
output.path = debug ? '/' : path.join(__dirname, '../DEM_MVC/wwwroot');
output.publicPath = debug ? '/' : '/wwwroot/';

//For all environments
const rules = [{
    test: /\.js$/,
    exclude: /(node_modules)/,
    include: path.join(__dirname, './src'),
    use: ['babel-loader']
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: 'url-loader?limit=8192&name=images/[name]-[hash].[ext]'
  }];

const styleLoaders = [
  {
    loader: 'css-loader',
    query: {
      sourceMap: debug ? false : true,
      modules: true,
      importLoaders: 1,
      localIdentName: debug ? '[name]__[local]___[hash:base64:5]' :'[hash:base64:5]'
    }
  },
  'postcss-loader',
  'resolve-url-loader',
  {
    loader: 'sass-loader',
    query: {
      sourceMap: true,
      includePaths: [
        path.resolve(__dirname, './src/scripts/_commonScss'),
        path.resolve(__dirname, 'node_modules')
      ]
    }
  }
];

if(debug){
  // DEVELOPMENT
  rules.push({
    test: /\.jsx$|\.js$/,
    use: 'eslint-loader',
    enforce: 'pre',
    include: path.join(__dirname, './src')
  },{
    test: /\.scss$/,
    use: ['style-loader', ...styleLoaders]
  });
} else {
  // PRODUCTION
  rules.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: styleLoaders
    })
  });
}

//For all environments
const eslint = {
  failOnWarning: false,
  failOnError: true
};

const postcss = [
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
const htmlWebpackPluginSettings = {
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
const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'js/vendor.bundle.js?[hash]'
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
  entry: entryPoints,
  target: 'web',
  output: output,
  module: {
    rules: rules
  },
  plugins: plugins
};
