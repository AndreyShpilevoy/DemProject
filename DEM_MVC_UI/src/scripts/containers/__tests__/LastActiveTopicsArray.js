/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import LastActiveTopicsArray from "../LastActiveTopicsArray";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

describe('LastActiveTopicsArray', () => {
  function setup() {
    const props = {
      store: sharedFakeStore(),
      actions: mockActions
    };
    return shallow(<LastActiveTopicsArray {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "lastActiveTopics" from "lastActiveTopicReducer" and recieve expected result', () => {
    expect(setup().prop('lastActiveTopics')).toEqual(sharedFakeStoreData.lastActiveTopicReducer.lastActiveTopics);
  });

  it('should find "LastActiveTopicsArrayComponent" component', () => {
    const divElement = setup().shallow();
    expect(divElement.find("LastActiveTopicsArrayComponent")).toBeTruthy();
  });
});
