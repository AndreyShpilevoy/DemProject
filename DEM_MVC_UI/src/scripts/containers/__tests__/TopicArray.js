/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import TopicArray from "../TopicArray";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

describe('TopicArray', () => {
  function setup(valid) {
    const props = {
      store: valid ? sharedFakeStore(true) : sharedFakeStore(false),
      actions: mockActions,
      forumId: 3
    };
    return shallow(<TopicArray {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "allTopics" from "topicReducer" and recieve expected result', () => {
    expect(setup(true).prop('topicArray')).toEqual(sharedFakeStoreData.topicReducer.allTopics[0].topicArray);
  });

  it('should get "allTopics" from "topicReducer" and recieve empty array', () => {
    expect(setup(false).prop('topicArray')).toEqual([]);
  });

  it('should find "TopicArrayComponent" component', () => {
    const divElement = setup().shallow();
    expect(divElement.find("TopicArrayComponent")).toBeTruthy();
  });
});
