"use strict";

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Autoprefixer = require("autoprefixer");
var Path = require("path");

module.exports = {
	devtool: "cheap-module-source-map",
	debug: true,
	noInfo: false,
	target: "web",
	entry: "./wwwroot/src/scripts/main.jsx",
	output: {
		path: Path.join(__dirname, "./wwwroot/dist"),
		filename: "dem.min.js"
	},
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: "ts-loader"
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