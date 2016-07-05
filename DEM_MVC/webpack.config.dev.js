const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Autoprefixer = require('autoprefixer');

export default {
	debug: true,
	devtool: "cheap-module-eval-source-map",
	noInfo: false,
	entry: "./wwwroot/src/scripts/main",
	target: "web",
	output: {
		path: path.join(__dirname, "./wwwroot/dist"),
		filename: "dem.min.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, "./wwwroot/src"),
				loaders: "babel"
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
		new ExtractTextPlugin("dem.min.css", {
			allChunks: true
		})
	],
	postcss: function () {
		return [Autoprefixer({
			browsers: ["> 1%", "last 2 versions"],
			cascade: false
		})];
	}
};
