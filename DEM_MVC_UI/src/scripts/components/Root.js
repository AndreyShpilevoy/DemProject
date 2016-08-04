import React, {PropTypes} from "react";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";

const Root = ({store, routes}) => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
};

export default Root;
