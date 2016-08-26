/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import webpack from 'webpack';
import path from 'path';
import Autoprefixer from 'autoprefixer';

export default {
	debug: true,
	devtool: "cheap-module-eval-source-map",
	noInfo: false,
	entry: [
		"babel-polyfill",
		"webpack-hot-middleware/client?reload=true",
		"./src/scripts/index"
	],
	target: "web",
	output: {
		path: '/',
		publicPath: '/',
		filename: "dem.min.js"
	},
	devServer:{
		contantBase: "./src"
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
				loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'url-loader',
				query: {
					limit: 8192,
					name: 'images/[name]-[hash].[ext]'
				}
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
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
