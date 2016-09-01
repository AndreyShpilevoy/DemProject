/* eslint no-undef: "off" */
/* eslint import/no-extraneous-dependencies: "off" */

import express from 'express';
import webpack from 'webpack';
import open from 'open';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import fs from 'fs';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

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

let content = fs.readFileSync(path.join( __dirname, '../src/index.html'), 'utf-8');
let newValue = content.replace(/(?:<%(.*)%>)/g, '').replace(/(<link (?:.*)>)/g, '').replace(/src=""/g, 'src="/dem.min.js"');

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
