/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import ChapterArray from "../ChapterArray";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";


describe('ChapterArray', () => {
  function setup() {
    const props = {
      store: sharedFakeStore(),
      actions: mockActions
    };
    return shallow(<ChapterArray {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "allChapters" from "chapterReducer" and recieve expected result', () => {
    expect(setup().prop('chapterArray')).toEqual(sharedFakeStoreData.chapterReducer.allChapters);
  });

  it('should find "ChapterArrayComponent" component', () => {
    const divElement = setup().shallow();
    expect(divElement.find("ChapterArrayComponent")).toBeTruthy();
  });
});
