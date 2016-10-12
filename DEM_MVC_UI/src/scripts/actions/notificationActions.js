import * as types from "./actionTypes";

function showInfoNotification(message, title, params){
  return {type: types.SHOW_INFO_NOTIFICATION, notification: Object.assign({}, {message, title, level: "info"}, params)};
}

function showSuccessNotification(message, title, params){
  return {type: types.SHOW_SUCCESS_NOTIFICATION, notification:  Object.assign({}, {message, title, level: "success"}, params)};
}

function showWarningNotification(message, title, params){
  return {type: types.SHOW_WARNING_NOTIFICATION, notification:  Object.assign({}, {message, title, level: "warning"}, params)};
}

function showExceptionNotification(message, title, params){
  return {type: types.SHOW_EXCEPTION_NOTIFICATION, notification:  Object.assign({}, {message, title, level: "error"}, params)};
}

export {
  showInfoNotification,
  showSuccessNotification,
  showWarningNotification,
  showExceptionNotification
};
