/*eslint no-undef: "off"*/

import * as types from "enums/actionTypes";
import notificationReducer from "reducers/notificationReducer";
import * as fakeData from "api/__fakeData__/index";

describe('notificationReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = notificationReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>allNotifications</code> in given action ADD_NOTIFICATION when state is empty allNotifications array', function(){
    // setup
    let action = {
      type: types.ADD_NOTIFICATION,
      notification: fakeData.notifications[0]
    };
    // execute
    let newState = notificationReducer(undefined, action);
    // verify
    expect(newState).toEqual({
        allNotifications: [fakeData.notifications[0]]
      });
  });


  it('returns the <code>allNotifications</code> in given action ADD_NOTIFICATION when state is not empty allNotifications array', function(){
    // setup
    let preloadedNotification = fakeData.notifications[0];
      let action = {
        type: types.ADD_NOTIFICATION,
        notification: fakeData.notifications[1]
      };
    // execute
    let newState = notificationReducer({
        allNotifications: [fakeData.notifications[0]]
      }, action);
    // verify
    expect(newState).toEqual({allNotifications:  [
      preloadedNotification, action.notification
    ]});
  });

  it('return empty array on REMOVE_NOTIFICATION action if state is empty', function(){
    // setup
    let action = {
      type: types.REMOVE_NOTIFICATION,
      uid: 1
    };
    // execute
    let newState = notificationReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('return object with empty "allNotifications" array on REMOVE_NOTIFICATION action if state is contains one notification', function(){
    // setup
    let action = {
      type: types.REMOVE_NOTIFICATION,
      uid: 1
    };
    // execute
    let newState = notificationReducer({
        allNotifications: [fakeData.notifications[0]]
      }, action);
    // verify
    expect(newState).toEqual({"allNotifications": []});
  });

  it('return object with "allNotifications" array that contains expected object on REMOVE_NOTIFICATION action if state is contains one notification', function(){
    // setup
    let action = {
      type: types.REMOVE_NOTIFICATION,
      uid: 1
    };
    // execute
    let newState = notificationReducer({
        allNotifications: [fakeData.notifications[1]]
      }, action);
    // verify
    expect(newState).toEqual({"allNotifications": [fakeData.notifications[1]]});
  });

  it('return object with "allNotifications" array that contains expected object on REMOVE_NOTIFICATION action if state is contains two notification', function(){
    // setup
    let action = {
      type: types.REMOVE_NOTIFICATION,
      uid: 1
    };
    // execute
    let newState = notificationReducer({
        allNotifications: [fakeData.notifications[0],fakeData.notifications[1]]
      }, action);
    // verify
    expect(newState).toEqual({"allNotifications": [fakeData.notifications[1]]});
  });
});
