/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Autoprefixer from 'autoprefixer';

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
	debug: true,
	devtool: "source-map",
	noInfo: false,
	entry: [
		"babel-polyfill",
		"./src/scripts/index"
	],
	target: "web",
	output: {
		path: path.join(__dirname, "../DEM_MVC/wwwroot"),
		publicPath: '/',
		filename: "dem.min.js"
	},
	devServer:{
		contantBase: "../DEM_MVC/wwwroot"
	},
	module: {
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint',
				include: path.join(__dirname, "./src")
      }
    ],
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, "./src"),
				loaders: ['react-hot',"babel"]
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", ["css-loader", "postcss-loader", "sass-loader"])
			},
			{
				test: /\.png$/,
				loader: "url-loader?limit=100000"
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
			Tether: "tether",
			"window.Tether": "tether"
		}),
		new webpack.DefinePlugin(GLOBALS),
		new ExtractTextPlugin('dem.min.css'),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new CopyWebpackPlugin([
			{ from: './node_modules/pace-progress/themes/orange/pace-theme-flash.css', to: 'pace.css' },
			{ from: './node_modules/pace-progress/pace.min.js', to: 'pace.min.js' },
		], {
				copyUnmodified: false
		})
	],
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
};
