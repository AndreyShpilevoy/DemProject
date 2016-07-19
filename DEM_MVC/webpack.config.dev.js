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
		"./wwwroot/src/scripts/index"
	],
	target: "web",
	output: {
		path: path.join(__dirname, "./wwwroot/dist"),
		publicPath: '/',
		filename: "dem.min.js"
	},
	devServer:{
		contantBase: "./wwwroot/src"
	},
	module: {
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint',
				include: path.join(__dirname, "./wwwroot/src")
      }
    ],
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, "./wwwroot/src"),
				loaders: ['react-hot',"babel"]
			},
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
			},
			{
				test: /\.png$/,
				loader: "url-loader?limit=100000"
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
		new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
			Tether: "tether",
			"window.Tether": "tether"
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
