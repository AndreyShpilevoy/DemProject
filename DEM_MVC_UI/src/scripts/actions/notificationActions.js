import * as types from "./actionTypes";

function showInfoNotification(message, title, params){
  return showNotification(message, title, params, "info");
}

function showSuccessNotification(message, title, params){
  return showNotification(message, title, params, "success");
}

function showWarningNotification(message, title, params){
  return showNotification(message, title, params, "warning");
}

function showExceptionNotification(message, title, params){
  return showNotification(message, title, params, "error");
}

function showNotification(message, title, params, level) {
  return {
    type: types.SHOW_NOTIFICATION,
    notification:  Object.assign({}, {message, title, level, uid: Date.now()}, params)};
}

function hideNotification(uid) {
  return {
    type: types.HIDE_NOTIFICATION,
    uid
  };
}

export {
  showInfoNotification,
  showSuccessNotification,
  showWarningNotification,
  showExceptionNotification,
  showNotification,
  hideNotification
};
