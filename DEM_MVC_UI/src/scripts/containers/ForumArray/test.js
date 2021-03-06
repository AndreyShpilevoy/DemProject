/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import * as mockActions from 'actions/__mocks__/sharedFakeActions';
import {sharedFakeStore, validFakeStoreData} from 'store/__mocks__/sharedFakeStore';
import ForumArray from './index';

describe('ForumArray', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions,
      chapterId: 3
    };
    return shallow(<ForumArray {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "allForums" from "forumReducer" and recieve expected result', () => {
    expect(setup(1).prop('forumArray')).toEqual(validFakeStoreData.forumReducer.allForums[0].forumArray);
  });

  it('should get "allForums" from "forumReducer" and recieve empty array', () => {
    expect(setup(0).prop('forumArray')).toEqual([]);
  });

  it('should find "ForumArray" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find('ForumArray').node.type.name).toEqual('ForumArray');
  });
});
