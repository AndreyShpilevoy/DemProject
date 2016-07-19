import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 60783;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  quiet: false,
  noInfo: false,
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
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
