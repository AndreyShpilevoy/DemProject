/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import NotificationCreator from "../NotificationCreator";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";


describe('NotificationCreator', () => {
  function setup(valid) {
    const props = {
      store: sharedFakeStore(valid),
      actions: mockActions
    };
    return shallow(<NotificationCreator {...props}/>, { lifecycleExperimental: true });
  }
    it('Should return "NotificationSystem" object', () => {
      expect(setup(true).shallow().find("NotificationSystem")).toBeTruthy();
    });

  it('should return "notificationArray" from "notificationReducer" and recieve expected result', () => {
      expect(setup(false).prop("notificationArray")).toEqual(sharedFakeStoreData.notificationArray);
  });

    it('"notificationReducer" result should beFalsy', () => {
    expect(setup(false).prop("notificationArray")).toBeFalsy();
  });
});
