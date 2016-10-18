/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import LastActiveTopicArray from "../LastActiveTopicArray";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

describe('LastActiveTopicArray', () => {
  function setup() {
    const props = {
      store: sharedFakeStore(),
      actions: mockActions
    };
    return shallow(<LastActiveTopicArray {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "lastActiveTopics" from "lastActiveTopicReducer" and recieve expected result', () => {
    expect(setup().prop('lastActiveTopics')).toEqual(sharedFakeStoreData.lastActiveTopicReducer.lastActiveTopics);
  });

  it('should find "LastActiveTopicArrayComponent" component', () => {
    const divElement = setup().shallow();
    expect(divElement.find("LastActiveTopicArrayComponent")).toBeTruthy();
  });
});
