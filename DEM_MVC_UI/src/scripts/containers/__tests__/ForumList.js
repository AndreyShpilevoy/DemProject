/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import {ForumList} from "../_all";
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

  it('should get "allForums" from "forumReducer" and recieve expected result', () => {
    expect(setup(true).prop('forumList')).toEqual(sharedFakeStoreData.forumReducer.allForums[0].forumList);
  });

  it('should get "allForums" from "forumReducer" and recieve empty array', () => {
    expect(setup(false).prop('forumList')).toEqual([]);
  });

  it('should find "ForumListComponent" component', () => {
    const divElement = setup().shallow();
    expect(divElement.find("ForumListComponent")).toBeTruthy();
  });
});
