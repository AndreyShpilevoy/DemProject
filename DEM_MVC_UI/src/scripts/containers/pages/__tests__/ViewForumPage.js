/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import ViewForumPage from "pages/ViewForumPage";
import * as mockActions from "actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, validFakeStoreData} from "store/__mocks__/sharedFakeStore";

describe('ViewForumPage', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions,
      params: {
        forumId: 3
      }
    };
    return shallow(<ViewForumPage {...props}/>, { lifecycleExperimental: true });
  }

  it('should render "div"',() => {
    const divElement = setup(0).find('div').first();
    expect(divElement).toBeTruthy();
  });

  it('should get "chapterById" from "chapterReducer" and recieve expected result', () => {
    expect(setup(1).prop('chapterItem')).toEqual(validFakeStoreData.chapterReducer.chapterById);
  });

  it('should get "chapterById" from "chapterReducer" and recieve expected "null"', () => {
    expect(setup(0).prop('chapterItem')).toEqual(null);
  });

  it('should find "ChapterItem" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find("ChapterItem").node.type.name).toEqual("ChapterItem");
  });

  it('should get "allTopics" from "topicReducer" and recieve expected result', () => {
    expect(setup(1).prop('topicArray')).toEqual(validFakeStoreData.topicReducer.allTopics[0].topicArray);
  });

  it('should get "allTopics" from "topicReducer" and recieve "[]"', () => {
    expect(setup(2).prop('topicArray')).toEqual([]);
  });

  it('should get "allTopics" from "topicReducer" and recieve []', () => {
    expect(setup(0).prop('topicArray')).toEqual([]);
  });

  it('should find "TopicArray" component', () => {
    const divElement = setup(0).shallow();
    expect(divElement.find("TopicArray").node.type.name).toEqual("TopicArray");
  });
});
