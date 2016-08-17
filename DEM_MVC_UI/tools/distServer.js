/* eslint no-undef: "off" */
/* eslint no-console: "off" */
/* eslint import/no-extraneous-dependencies: "off" */

import express from 'express';
import open from 'open';
import path from 'path';

const port = 60784;
const app = express();

app.use(express.static('../DEM_MVC'));

app.get('*', (req, res) => {
  res.sendFile(path.join( __dirname, '../../DEM_MVC/wwwroot/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
