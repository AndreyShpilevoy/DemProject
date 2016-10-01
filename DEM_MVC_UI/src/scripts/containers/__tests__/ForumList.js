/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import ForumList from "../ForumList";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

describe('ForumList', () => {
  function setup(valid) {
    const props = {
      store: valid ? sharedFakeStore(true) : sharedFakeStore(false),
      actions: mockActions,
      chapterId: 3
    };
    return shallow(<ForumList {...props}/>, { lifecycleExperimental: true });
  }

  it('should call "componentDidMount" once',() => {
    sinon.spy(ForumList.prototype, 'componentDidMount');
    setup(true).shallow({ lifecycleExperimental: true });
    expect(ForumList.prototype.componentDidMount.calledOnce).toBeTruthy();
  });

  it('should get "allForums" from "forumReducer" and recieve expected result', () => {
    expect(setup(true).prop('forumList')).toEqual(sharedFakeStoreData.forumReducer.allForums[0].forumList);
  });

  it('should get "allForums" from "forumReducer" and recieve empty array', () => {
    expect(setup(false).prop('forumList')).toEqual([]);
  });
});
