import * as types from "enums/actionTypes";

function addInfoNotification(notification){
  return addNotification(notification, "info");
}

function addSuccessNotification(notification){
  return addNotification(notification, "success");
}

function addWarningNotification(notification){
  return addNotification(notification, "warning");
}

function addExceptionNotification(notification){
  return addNotification(notification, "error");
}

function addNotification(notification, level) {
  return {
    type: types.ADD_NOTIFICATION,
    notification:  Object.assign({}, notification, {level, uid: notification.uid || Date.now()})
  };
}

function removeNotification(uid) {
  return {type: types.REMOVE_NOTIFICATION, uid};
}

export {
  addInfoNotification,
  addSuccessNotification,
  addWarningNotification,
  addExceptionNotification,
  addNotification,
  removeNotification
};
