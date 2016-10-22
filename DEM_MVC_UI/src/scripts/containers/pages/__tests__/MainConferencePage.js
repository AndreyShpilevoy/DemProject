/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import MainConferencePage from "../MainConferencePage";
import * as mockActions from "../../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../../store/__mocks__/sharedFakeStore";

describe('MainConferencePage', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions
    };
    return shallow(<MainConferencePage {...props}/>, { lifecycleExperimental: true });
  }

  it('should render "div"',() => {
    const divElement = setup(1).find('div').first();
    expect(divElement).toBeTruthy();
  });

  it('should get "allChapters" from "chapterReducer" and recieve expected result', () => {
    expect(setup(1).prop('chapterArray')).toEqual(sharedFakeStoreData.chapterReducer.allChapters);
  });

  it('should find "ChapterArray" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find("ChapterArray")).toBeTruthy();
  });

  it('should get "lastActiveTopics" from "lastActiveTopicReducer" and recieve expected result', () => {
    expect(setup(1).prop('lastActiveTopics')).toEqual(sharedFakeStoreData.lastActiveTopicReducer.lastActiveTopics);
  });

  it('should find "LastActiveTopicArray" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find("LastActiveTopicArray")).toBeTruthy();
  });

});
