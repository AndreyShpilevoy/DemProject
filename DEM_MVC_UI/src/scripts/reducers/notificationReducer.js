import * as types from "enums/actionTypes";

export default function notificationReducer(state = [], action) {
    switch (action.type) {
      case types.ADD_NOTIFICATION:
        if(state.allNotifications){
          return Object.assign({}, state, {
            allNotifications: [...state.allNotifications, action.notification]
          });
        }
        return Object.assign({}, state, {
          allNotifications: [action.notification]
        });

      case types.REMOVE_NOTIFICATION:
        if(state.allNotifications){
          return {allNotifications: state.allNotifications.filter(notification => {
            return notification.uid !== action.uid;
          })};
        }
        return state;

        default:
          return state;
    }
}
