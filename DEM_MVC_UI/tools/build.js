/*eslint no-undef: "off"*/
/* eslint no-console: "off" */
/* eslint no-unused-vars: "off" */
/* eslint import/no-extraneous-dependencies: "off" */

const webpack = require('webpack');
const colors = require('colors');
const webpackConfig = require('../webpack.config.prod');

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

console.log('Generating minified bundle for production via Webpack. This will take a moment...'.green);

webpack(webpackConfig).run((error, stats) => {
  if (error) { // so a fatal error occurred. Stop here.
    console.log(error.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  // if we got this far, the build succeeded.
  console.log('Your app is compiled in production mode in ../DEM_MVC/wwwroot. It\'s ready to roll!'.green);
  return 0;
});
