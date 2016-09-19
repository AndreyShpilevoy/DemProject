import React, {PropTypes} from "react";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";
import { syncHistoryWithStore } from 'react-router-redux';

class Root extends React.Component{
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const history = syncHistoryWithStore(browserHistory, this.props.store);
    return (
      <Provider store={this.props.store}>
        <Router history={history} routes={this.props.routes}/>
      </Provider>
    );
  }
}

export default Root;
