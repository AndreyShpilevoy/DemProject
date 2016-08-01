import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";
import routes from "./routes";
import configureStore from "./store/configureStore";
import shrinkingHeader from "./other/shrinkingHeader";
import rootSaga from './sagas/rootSaga';
import "../scss/main-dem.scss";

const store = configureStore();
store.runSaga(rootSaga);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app'));

shrinkingHeader();
