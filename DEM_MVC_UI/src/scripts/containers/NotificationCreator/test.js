/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import * as mockActions from 'actions/__mocks__/sharedFakeActions';
import {sharedFakeStore, validFakeStoreData} from 'store/__mocks__/sharedFakeStore';
import NotificationCreator from './index';


describe('NotificationCreator', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions
    };
    return shallow(<NotificationCreator {...props}/>, { lifecycleExperimental: true });
  }
    it('Should return "NotificationSystem" object', () => {
      expect(setup(1).shallow().find('NotificationSystem')).toBeTruthy();
    });

  it('should return "notificationArray" from "notificationReducer" and recieve expected result', () => {
      expect(setup(1).prop('notificationArray')).toEqual(validFakeStoreData.notificationReducer.allNotifications);
  });

    it('should return "notificationArray" from "notificationReducer" and recieve expected result - []', () => {
    expect(setup(0).prop('notificationArray')).toEqual([]);
  });
});
