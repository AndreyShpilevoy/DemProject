/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as notificationActions from "../notificationActions";


describe('notificationActions', () => {
  it('should create an action with "SHOW_INFO_NOTIFICATION" action type and expected model', () => {
    const expectedAction = {
      type: types.SHOW_INFO_NOTIFICATION,
      notification: {
        message: "message",
        title: "title",
        level: "info",
        autoDismiss: 5
      }
    };
    expect(
      notificationActions.showInfoNotification(
        "message", "title", {autoDismiss: 5}
      )
    ).toEqual(expectedAction);
  });

  it('should create an action with "SHOW_SUCCESS_NOTIFICATION" action type and expected model', () => {
    const expectedAction = {
      type: types.SHOW_SUCCESS_NOTIFICATION,
      notification: {
        message: "message",
        title: "title",
        level: "success",
        autoDismiss: 5
      }
    };
    expect(
      notificationActions.showSuccessNotification(
        "message", "title", {autoDismiss: 5}
      )
    ).toEqual(expectedAction);
  });

  it('should create an action with "SHOW_WARNING_NOTIFICATION" action type and expected model', () => {
    const expectedAction = {
      type: types.SHOW_WARNING_NOTIFICATION,
      notification: {
        message: "message",
        title: "title",
        level: "warning",
        autoDismiss: 5
      }
    };
    expect(
      notificationActions.showWarningNotification(
        "message", "title", {autoDismiss: 5}
      )
    ).toEqual(expectedAction);
  });

  it('should create an action with "SHOW_EXCEPTION_NOTIFICATION" action type and expected model', () => {
    const expectedAction = {
      type: types.SHOW_EXCEPTION_NOTIFICATION,
      notification: {
        message: "message",
        title: "title",
        level: "error",
        autoDismiss: 5
      }
    };
    expect(
      notificationActions.showExceptionNotification(
        "message", "title", {autoDismiss: 5}
      )
    ).toEqual(expectedAction);
  });
});
