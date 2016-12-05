/* eslint no-undef: "off" */
/* eslint import/no-extraneous-dependencies: "off" */
/* eslint-disable no-console */

process.env.NODE_ENV = 'development'; // this assures React is built in development mode and that the Babel prod config doesn't apply.

const express = require('express');
const webpack = require('webpack');
const open = require('open');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const fs = require('fs');
const config = require('../webpack.config');

const port = 60782;
const host = 'localhost';
const app = express();
const compiler = webpack(config);
const middleware = webpackDevMiddleware(compiler, {
  contentBase: `http://${host}:${port}`,
  quiet: false,
  noInfo: false,
  hot: true,
  publicPath: config.output.publicPath,
  stats: {
    assets: true,
    colors: true,
    version: false,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

const content = fs.readFileSync(path.join( __dirname, '../src/index.html'), 'utf-8');
const newValue = content.replace(/(?:<%(.*)%>)/g, '').replace(/(<link (?:.*)>)/g, '').replace(/src=""/g, 'src="/js/vendor.bundle.js"></script><script type="text/javascript" src="/js/bundle.js"');

app.get('*', (req, res) => {
  res.send(newValue);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://${host}:${port}`);
  }
});
