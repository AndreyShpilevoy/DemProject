/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as notificationActions from "../notificationActions";


describe('notificationActions', () => {
  it('should create an action with "ADD_NOTIFICATION" action type and expected model', () => {
    const expectedAction = {
      type: types.ADD_NOTIFICATION,
      notification: {
        message: "message",
        title: "title",
        level: "info",
        autoDismiss: 5,
        uid: 1
      }
    };
    expect(
      notificationActions.addNotification(
        {message: "message", title: "title", autoDismiss: 5, uid: 1}, "info"
      )
    ).toEqual(expectedAction);
  });

  it('should create an action with "REMOVE_NOTIFICATION" action type and expected model', () => {
    const expectedAction = {
      type: types.REMOVE_NOTIFICATION,
      uid: 111
    };
    expect(notificationActions.removeNotification(111)).toEqual(expectedAction);
  });

  it('should create action with and expected "info" notification model', () => {
    const expectedParams = {
      message: "message",
      title: "title",
      level: "info",
      autoDismiss: 5,
      uid: 1
    };
    expect(notificationActions.addInfoNotification(
      {message: "message", title: "title", autoDismiss: 5, uid: 1}
    ).notification).toEqual(expectedParams);
  });

  it('should create action with and expected "success" notification model', () => {
    const expectedParams = {
      message: "message",
      title: "title",
      level: "success",
      autoDismiss: 5,
      uid: 1
    };
    expect(notificationActions.addSuccessNotification(
      {message: "message", title: "title", autoDismiss: 5, uid: 1}
    ).notification).toEqual(expectedParams);
  });

  it('should create action with and expected "warning" notification model', () => {
    const expectedParams = {
      message: "message",
      title: "title",
      level: "warning",
      autoDismiss: 5,
      uid: 1
    };
    expect(notificationActions.addWarningNotification(
      {message: "message", title: "title", autoDismiss: 5, uid: 1}
    ).notification).toEqual(expectedParams);
  });

  it('should create action with and expected "error" notification model', () => {
    const expectedParams = {
      message: "message",
      title: "title",
      level: "error",
      autoDismiss: 5,
      uid: 1
    };
    expect(notificationActions.addExceptionNotification(
      {message: "message", title: "title", autoDismiss: 5, uid: 1}
    ).notification).toEqual(expectedParams);
  });

  it('should create action with notification model that has Truthy uid', () => {
    expect(notificationActions.addExceptionNotification(
      {message: "message", title: "title", autoDismiss: 5}
    ).notification.uid).toBeTruthy();
  });
});
