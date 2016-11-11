/*eslint no-undef: 'off'*/

import * as types from 'enums/actionTypes';
import notificationReducer from 'reducers/notificationReducer';
import * as fakeData from 'api/__fakeData__/index';

describe('notificationReducer', function(){
  it('returns an empty array as default state', function(){
    let action = { type: 'unknown' };

    expect(notificationReducer(undefined, action)).toEqual([]);
  });

  it('should return "state" without changes if Action Type wasnt handled and "state" has predifined data', function(){
    let action = { type: 'unknown' };
    let state = {
      allNotifications: [fakeData.notifications[0]]
    };

    expect(notificationReducer(state, action)).toEqual(state);
  });

  it('should return "state" with "allNotifications" array, that contain three expected elements. ActionType "ADD_NOTIFICATION", "state" is empty', function(){
    let action = {
      type: types.ADD_NOTIFICATION,
      notification: fakeData.notifications[0]
    };

    expect(notificationReducer(undefined, action)).toEqual({ allNotifications: [fakeData.notifications[0]]});
  });

  it('should return "state" with "allNotifications" array, that contain three expected elements. ActionType "ADD_NOTIFICATION", "state" has prefilled data', function(){
      let action = {
        type: types.ADD_NOTIFICATION,
        notification: fakeData.notifications[1]
      };
      let state = {
        allNotifications: [fakeData.notifications[0]]
      };

    expect(notificationReducer(state, action)).toEqual({allNotifications:  [...state.allNotifications, action.notification]});
  });

  it('should return "state" with empty "allNotifications" array. ActionType "REMOVE_NOTIFICATION", "state" is empty', function(){
    let action = {
      type: types.REMOVE_NOTIFICATION,
      uid: 1
    };

    expect(notificationReducer(undefined, action)).toEqual([]);
  });

  it('should return "state" with empty "allNotifications" array. ActionType "REMOVE_NOTIFICATION", "state" has prefilled data', function(){
    let action = {
      type: types.REMOVE_NOTIFICATION,
      uid: 1
    };
    let state = {
      allNotifications: [fakeData.notifications[0]]
    };

    expect(notificationReducer(state, action)).toEqual({allNotifications:[]});
  });

  it('should return "state" with "allNotifications" array, that contains prefilled data. ActionType "REMOVE_NOTIFICATION", "uid" of item that is not present in preffiled data, "state" has prefilled data', function(){
    let action = {
      type: types.REMOVE_NOTIFICATION,
      uid: 1
    };
    let state = {
        allNotifications: [fakeData.notifications[1]]
    };

    expect(notificationReducer(state, action)).toEqual({allNotifications: [fakeData.notifications[1]]});
  });

  it('should return "state" with "allNotifications" array, that contains expected element. ActionType "REMOVE_NOTIFICATION", "uid" of item that is present in preffiled data, "state" has prefilled data', function(){
    let action = {
      type: types.REMOVE_NOTIFICATION,
      uid: 1
    };
    let state = {
        allNotifications: [fakeData.notifications[0],fakeData.notifications[1]]
    };

    expect(notificationReducer(state, action)).toEqual({allNotifications: [fakeData.notifications[1]]});
  });
});
