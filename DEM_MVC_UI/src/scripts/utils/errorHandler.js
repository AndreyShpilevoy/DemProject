import * as notificationActions from "../actions/notificationActions";

export default function errorHandler(error, getState, dispatch) {
  dispatch(notificationActions.showExceptionNotification(
    "Pleace, notify administration about error ocured.\r\nTry to reload page.\r\nError: " + error,
    "An error has occurred",
    {
      autoDismiss:10,
      dismissible: false
    }
  ));
}
