import React from "react";
import {render} from "react-dom";
import configureStore from "./store/configureStore";
import routes from "./routes";
import Root from "./components/Root";
import shrinkingHeader from "./other/shrinkingHeader";
import rootSaga from "./sagas/rootSaga";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../scss/main-dem.scss";

const store = configureStore();
store.runSaga(rootSaga);

render(
  <Root store={store} routes={routes}/>,
  document.getElementById('app')
);

shrinkingHeader();
