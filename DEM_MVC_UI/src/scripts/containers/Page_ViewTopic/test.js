/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import * as mockActions from 'actions/__mocks__/sharedFakeActions';
import {sharedFakeStore, validFakeStoreData} from 'store/__mocks__/sharedFakeStore';
import PageViewTopic from './index';

describe('PageViewTopic', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions,
      params: {
        topicId: 1
      }
    };
    return shallow(<PageViewTopic {...props}/>, { lifecycleExperimental: true });
  }

  it('should render "div"',() => {
    const divElement = setup(0).find('div').first();
    expect(divElement).toBeTruthy();
  });

  it('should get "allPosts" from "postReducer" and recieve expected result', () => {
    expect(setup(1).prop('postArray')).toEqual(validFakeStoreData.postReducer.allPosts[0].postArray);
  });

  it('should get "allPosts" from "postReducer" and recieve {"postArray": []}', () => {
    expect(setup(2).prop('postArray')).toEqual({'postArray': []});
  });

  it('should get "allPosts" from "postReducer" and recieve []', () => {
    expect(setup(0).prop('postArray')).toEqual([]);
  });

  it('should find "PostArray" component', () => {
    const divElement = setup(0).shallow();
    expect(divElement.find('PostArray').node.type.name).toEqual('PostArray');
  });
});
