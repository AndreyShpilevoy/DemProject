/* eslint no-console: "off" */
/* eslint no-undef: "off" */

import * as notificationActions from "../actions/notificationActions";

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    store.dispatch(notificationActions.showExceptionNotification(
      "Pleace, notify administration about error ocured.\r\nTry to reload page.\r\nError: " + error,
      "An error has occurred",
      {
        autoDismiss:10,
        dismissible: false
      }
    ));
    return error;
  }
};

export {logger, crashReporter};
