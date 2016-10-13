/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import ChapterList from "../ChapterList";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";


describe('ChapterList', () => {
  function setup() {
    const props = {
      store: sharedFakeStore(),
      actions: mockActions
    };
    return shallow(<ChapterList {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "allChapters" from "chapterReducer" and recieve expected result', () => {
    expect(setup().prop('chapterList')).toEqual(sharedFakeStoreData.chapterReducer.allChapters);
  });

  it('should find "ChapterListComponent" component', () => {
    const divElement = setup().shallow();
    expect(divElement.find("ChapterListComponent")).toBeTruthy();
  });
});
