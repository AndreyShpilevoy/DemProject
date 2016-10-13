/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as notificationActions from "../notificationActions";


describe('notificationActions', () => {
  it('should create an action with "SHOW_NOTIFICATION" action type and expected model', () => {
    const expectedAction = {
      type: types.SHOW_NOTIFICATION,
      notification: {
        message: "message",
        title: "title",
        level: "info",
        autoDismiss: 5,
        uid: 1
      }
    };
    expect(
      notificationActions.showInfoNotification(
        "message", "title", {autoDismiss: 5, uid: 1}
      )
    ).toEqual(expectedAction);
  });
});
