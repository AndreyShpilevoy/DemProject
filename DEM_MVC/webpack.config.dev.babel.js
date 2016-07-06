import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Autoprefixer from 'autoprefixer';

export default {
	debug: true,
	devtool: "cheap-module-eval-source-map",
	noInfo: false,
	entry: "./wwwroot/src/scripts/index",
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
				loader: "babel"
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
