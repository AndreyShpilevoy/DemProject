/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import ViewTopicPage from "pages/ViewTopicPage";
import * as mockActions from "actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "store/__mocks__/sharedFakeStore";

describe('ViewTopicPage', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions,
      params: {
        topicId: 1
      }
    };
    return shallow(<ViewTopicPage {...props}/>, { lifecycleExperimental: true });
  }

  it('should render "div"',() => {
    const divElement = setup(0).find('div').first();
    expect(divElement).toBeTruthy();
  });

  it('should get "allPosts" from "postReducer" and recieve expected result', () => {
    expect(setup(1).prop('postArray')).toEqual(sharedFakeStoreData.postReducer.allPosts[0].postArray);
  });

  it('should get "allPosts" from "postReducer" and recieve "null"', () => {
    expect(setup(2).prop('postArray')).toEqual(null);
  });

  it('should get "allPosts" from "postReducer" and recieve undefined', () => {
    expect(setup(0).prop('postArray')).toEqual(undefined);
  });

  it('should find "PostArray" component', () => {
    const divElement = setup(0).shallow();
    expect(divElement.find("PostArray").node.type.name).toEqual("PostArray");
  });
});
