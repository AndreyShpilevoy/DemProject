/* eslint import/no-extraneous-dependencies: "off" */
/* eslint no-unused-vars: "off" */

import fs from "fs";
import cheerio from "cheerio";
import colors from "colors";

/* eslint-disable no-console */

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if(err){
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  $('head').prepend('\n\t<link type="text/css" rel="stylesheet" href="/wwwroot/dem.min.css">');
  $('head').prepend('\n\t<link type="text/css" rel="stylesheet" href="/wwwroot/pace.css">');
  $('script').replaceWith('<script src="/wwwroot/dem.min.js"></script>\n\t');
  $('script').before('<script src="/wwwroot/pace.min.js"></script>\n\t');

  fs.writeFile('../DEM_MVC/wwwroot/index.html', $.html(), 'utf8', function (err) {
    if(err){
      return console.log(err);
    }
    console.log('index.html written to ../DEM_MVC/wwwroot/index.html'.green);
  });
});
