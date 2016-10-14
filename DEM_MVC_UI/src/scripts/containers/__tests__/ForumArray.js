/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import ForumArray from "../ForumArray";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

describe('ForumArray', () => {
  function setup(valid) {
    const props = {
      store: valid ? sharedFakeStore(true) : sharedFakeStore(false),
      actions: mockActions,
      chapterId: 3
    };
    return shallow(<ForumArray {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "allForums" from "forumReducer" and recieve expected result', () => {
    expect(setup(true).prop('forumArray')).toEqual(sharedFakeStoreData.forumReducer.allForums[0].forumArray);
  });

  it('should get "allForums" from "forumReducer" and recieve empty array', () => {
    expect(setup(false).prop('forumArray')).toEqual([]);
  });

  it('should find "ForumArrayComponent" component', () => {
    const divElement = setup().shallow();
    expect(divElement.find("ForumArrayComponent")).toBeTruthy();
  });
});
