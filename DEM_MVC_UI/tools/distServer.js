/* eslint no-undef: "off" */
/* eslint import/no-extraneous-dependencies: "off" */
/* eslint-disable no-console */

const express = require('express');
const open = require('open');
const path = require('path');

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
