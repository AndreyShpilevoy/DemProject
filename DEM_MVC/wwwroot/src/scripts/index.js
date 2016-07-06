import 'babel-polyfill';
import "./../scss/main-dem.scss";
import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from 'react-router';
import routes from './routes';

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
);


// register jQuery and Tether as global variable (require for Bootstrap)
import * as JQuery from "jquery";
import * as tether from "tether";
window.jQuery = window.$ = JQuery;
window.Tether = tether;
// register jQuery and Tether as global variable (require for Bootstrap) - end

import * as bootstrap from "bootstrap";
import { ShrinkingHeader } from './Behaviour/ShrinkingHeader';

[bootstrap, ShrinkingHeader];
