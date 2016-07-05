import 'babel-polyfill';

// register css
import "./../scss/main-dem.scss";

// register jQuery and Tether as global variable (require for Bootstrap)
import * as JQuery from "jquery";
import * as tether from "tether";

window.jQuery = window.$ = JQuery;
window.Tether = tether;
// register jQuery and Tether as global variable (require for Bootstrap) - end

import * as React from "react";
import { render } from "react-dom";
import * as bootstrap from "bootstrap";
const ShrinkingHeader = require('./Behaviour/ShrinkingHeader');
const Layout = require('./Components/Layout');

[bootstrap, ShrinkingHeader, Layout];
