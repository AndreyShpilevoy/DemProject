/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import * as mockActions from 'actions/__mocks__/sharedFakeActions';
import {sharedFakeStore, validFakeStoreData} from 'store/__mocks__/sharedFakeStore';
import PageMainConference from './index';

describe('PageMainConference', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions
    };
    return shallow(<PageMainConference {...props}/>, { lifecycleExperimental: true });
  }

  it('should render "div"',() => {
    const divElement = setup(1).find('div').first();
    expect(divElement).toBeTruthy();
  });

  it('should get "allChapters" from "chapterReducer" and recieve expected result', () => {
    expect(setup(1).prop('chapterArray')).toEqual(validFakeStoreData.chapterReducer.allChapters);
  });

  it('should find "ChapterArray" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find('ChapterArray').first()).toBeTruthy();
  });

  it('should get "lastActiveTopics" from "lastActiveTopicReducer" and recieve expected result', () => {
    expect(setup(1).prop('lastActiveTopics')).toEqual(validFakeStoreData.lastActiveTopicReducer.lastActiveTopics);
  });

  it('should find "LastActiveTopicArray" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find('LastActiveTopicArray').node.type.name).toEqual('LastActiveTopicArray');
  });

});
