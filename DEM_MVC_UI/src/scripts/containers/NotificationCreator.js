import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import NotificationSystem from 'react-notification-system';

class NotificationCreator extends React.Component {
  static _notificationSystem = null;
  static propTypes = {
    notification: PropTypes.shape({
      message: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      title: PropTypes.string,
      position: PropTypes.string,
      autoDismiss: PropTypes.number,
      dismissible: PropTypes.bool,
      action: PropTypes.object,
      children: PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element,
      ]),
      onAdd: PropTypes.func,
      onRemove: PropTypes.func,
      uid: PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
      ])
    }).isRequired,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification) {
      this._addNotification(nextProps.notification);
    }
  }

  _addNotification = (notification) => {
    this._notificationSystem.addNotification({...notification});
  }

  render(){
    return(
      <NotificationSystem ref="notificationSystem" />
    );
  }
}

const mapStateToProps = (state) => ({
  notification: state.notificationReducer.notification
});

export default connect(mapStateToProps)(NotificationCreator);
