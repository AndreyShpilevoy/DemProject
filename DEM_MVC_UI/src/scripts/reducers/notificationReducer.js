import * as types from "../actions/actionTypes";

export default function notificationReducer(state = [], action) {
    switch (action.type) {
      case types.SHOW_NOTIFICATION:
        if(state.allNotifications){
          return Object.assign({}, state, {
            allNotifications: [...state.allNotifications, action.notification]
          });
        }
        return Object.assign({}, state, {
          allNotifications: [action.notification]
        });

      case types.HIDE_NOTIFICATION:
        if(state.allNotifications){
          return state.allNotifications.filter(notification => {
            return notification.uid !== action.uid;
          });
        }
        return state;

        default:
          return state;
    }
}
