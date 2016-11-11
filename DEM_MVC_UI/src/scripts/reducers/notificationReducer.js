import * as types from 'enums/actionTypes';

export default function notificationReducer(state = [], action) {
  let localState = state;
  switch (action.type) {
    case types.ADD_NOTIFICATION:
      if(localState.allNotifications){
        localState = Object.assign({}, localState, {
          allNotifications: [...localState.allNotifications, action.notification]
        });
      } else {
        localState = Object.assign({}, localState, {
          allNotifications: [action.notification]
        });
      }
      break;

    case types.REMOVE_NOTIFICATION:
      if(localState.allNotifications){
        localState = {allNotifications: localState.allNotifications.filter(notification => {
          return notification.uid !== action.uid;
        })};
      }
      break;
  }
  return localState;
}
