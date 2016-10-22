/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import ViewForumPage from "../ViewForumPage";
import * as mockActions from "../../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../../store/__mocks__/sharedFakeStore";

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
    expect(setup(1).prop('chapterItem')).toEqual(sharedFakeStoreData.chapterReducer.chapterById);
  });

  it('should get "chapterById" from "chapterReducer" and recieve expected "undefined"', () => {
    expect(setup(0).prop('chapterItem')).toEqual(undefined);
  });

  it('should find "ChapterItem" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find("ChapterItem")).toBeTruthy();
  });

  it('should get "allTopics" from "topicReducer" and recieve expected result', () => {
    expect(setup(1).prop('topicArray')).toEqual(sharedFakeStoreData.topicReducer.allTopics[0].topicArray);
  });

  it('should get "allTopics" from "topicReducer" and recieve "null"', () => {
    expect(setup(2).prop('topicArray')).toEqual(null);
  });

  it('should get "allTopics" from "topicReducer" and recieve undefined', () => {
    expect(setup(0).prop('topicArray')).toEqual(undefined);
  });

  it('should find "TopicArrayComponent" component', () => {
    const divElement = setup(0).shallow();
    expect(divElement.find("TopicArrayComponent")).toBeTruthy();
  });
});
