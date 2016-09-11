import React from "react";
import {render} from "react-dom";
import root from "lodash/_root";
import {Root} from "./containers/_all";
import configureStore from "./store/configureStore";
import routes from "./routes";
import rootSaga from "./sagas/rootSaga";
import "../scss/main-dem.scss";

const store = configureStore()();
store.runSaga(rootSaga);

render(
  <Root store={store} routes={routes}/>,
  root.document.getElementById('app')
);
