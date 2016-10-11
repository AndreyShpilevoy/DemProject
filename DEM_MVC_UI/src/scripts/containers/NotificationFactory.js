import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import NotificationSystem from 'react-notification-system';
import * as localeActions from "../actions/localeActions";

class NotificationFactory extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  static _notificationSystem = null;

  /* istanbul ignore next */
  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  _addNotification = (event) => {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success'
    });
  }

  render(){
    return(
      <div>
        <button onClick={this._addNotification}>Add notification</button>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let result = {};
  if(state.localeReducer &&
    state.localeReducer.currentLocale &&
    state.localeReducer.currentLocale.locale){
    result = {locale: state.localeReducer.currentLocale.locale};
  }
  return result;
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(localeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationFactory);
