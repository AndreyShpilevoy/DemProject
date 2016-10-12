import * as types from "../actions/actionTypes";

export default function notificationReducer(state = [], action) {
    switch (action.type) {
        case types.SHOW_INFO_NOTIFICATION:
        case types.SHOW_SUCCESS_NOTIFICATION:
        case types.SHOW_WARNING_NOTIFICATION:
        case types.SHOW_EXCEPTION_NOTIFICATION:
          return Object.assign({}, state, {
            notification: action.notification
          });

        default:
          return state;
    }
}
