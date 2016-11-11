import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NotificationSystem from 'react-notification-system';
import * as notificationActions from 'actions/notificationActions';

class NotificationCreator extends React.Component {
  static _notificationSystem = null;
  static propTypes = {
    notificationArray: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
        title: PropTypes.string,
        position: PropTypes.string,
        autoDismiss: PropTypes.number,
        dismissible: PropTypes.bool,
        action: PropTypes.object,
        children: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.element,
        ]),
        onAdd: PropTypes.func,
        onRemove: PropTypes.func,
        uid: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ])
      })).isRequired,
    actions: PropTypes.object.isRequired
  };

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    let notificationSystem = this.refs.notificationSystem;
    const notificationArray = nextProps.notificationArray ? nextProps.notificationArray : [];
    const notificationIds = notificationArray.map(notification => notification.uid);
    const removeNotification = this.props.actions.removeNotification;

    (notificationSystem.state.notifications || []).forEach(notification => {
      if (notificationIds.indexOf(notification.uid) < 0) {
        notificationSystem.removeNotification(notification.uid);
      }
    });

    notificationArray.forEach(notification => {
      const uid = notification.uid;
      notificationSystem.addNotification({
        ...notification,
        onRemove: () => {
          removeNotification(uid);
          if(notification.onRemove) notification.onRemove();
        }
      });
    });
  }

  render(){
    return(
      <NotificationSystem ref="notificationSystem" />
    );
  }
}

const mapStateToProps = (state) => {
  return (state.notificationReducer && state.notificationReducer.allNotifications) ?
    {notificationArray: state.notificationReducer.allNotifications} :
    {notificationArray: []};
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(notificationActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCreator);
