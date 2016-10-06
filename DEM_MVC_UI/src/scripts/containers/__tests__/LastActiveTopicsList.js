/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import LastActiveTopicsList from "../LastActiveTopicsList";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

describe('LastActiveTopicsList', () => {
  function setup() {
    const props = {
      store: sharedFakeStore(),
      actions: mockActions
    };
    return shallow(<LastActiveTopicsList {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "lastActiveTopics" from "lastActiveTopicReducer" and recieve expected result', () => {
    expect(setup().prop('lastActiveTopics')).toEqual(sharedFakeStoreData.lastActiveTopicReducer.lastActiveTopics);
  });

  it('should find "LastActiveTopicsListComponent" component', () => {
    const divElement = setup().shallow();
    expect(divElement.find("LastActiveTopicsListComponent")).toBeTruthy();
  });
});
