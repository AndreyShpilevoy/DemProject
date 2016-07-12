import 'babel-polyfill';
import "./../scss/main-dem.scss";
import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { ShrinkingHeader } from './Behaviour/ShrinkingHeader';

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
);

ShrinkingHeader();
