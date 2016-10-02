/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import TopicList from "../TopicList";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

describe('TopicList', () => {
  function setup(valid) {
    const props = {
      store: valid ? sharedFakeStore(true) : sharedFakeStore(false),
      actions: mockActions,
      forumId: 3
    };
    return shallow(<TopicList {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "allTopics" from "topicReducer" and recieve expected result', () => {
    expect(setup(true).prop('topicList')).toEqual(sharedFakeStoreData.topicReducer.allTopics[0].topicList);
  });

  it('should get "allTopics" from "topicReducer" and recieve empty array', () => {
    expect(setup(false).prop('topicList')).toEqual([]);
  });

  it('should find "TopicListComponent" component', () => {
    const divElement = setup().shallow();
    expect(divElement.find("TopicListComponent")).toBeTruthy();
  });
});
