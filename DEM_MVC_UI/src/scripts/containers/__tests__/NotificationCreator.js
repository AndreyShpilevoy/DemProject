/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import NotificationCreator from "containers/NotificationCreator";
import * as mockActions from "actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "store/__mocks__/sharedFakeStore";


describe('NotificationCreator', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions
    };
    return shallow(<NotificationCreator {...props}/>, { lifecycleExperimental: true });
  }
    it('Should return "NotificationSystem" object', () => {
      expect(setup(1).shallow().find("NotificationSystem")).toBeTruthy();
    });

  it('should return "notificationArray" from "notificationReducer" and recieve expected result', () => {
      expect(setup(1).prop("notificationArray")).toEqual(sharedFakeStoreData.notificationReducer.allNotifications);
  });

    it('should return "notificationArray" from "notificationReducer" and recieve expected result - []', () => {
    expect(setup(0).prop("notificationArray")).toEqual([]);
  });
});
