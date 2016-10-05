/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import ChapterItemById from "../ChapterItemById";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";


describe('ChapterItemById', () => {
  function setup(valid) {
    const props = {
      store: sharedFakeStore(valid),
      actions: mockActions,
      params: {id: 4}
    };
    return shallow(<ChapterItemById {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "chapterById" from "chapterReducer" and recieve expected result', () => {
    expect(setup(true).prop('chapterItem')).toEqual(sharedFakeStoreData.chapterReducer.chapterById);
  });

  it('should get "chapterById" from "chapterReducer" and recieve expected "undefined"', () => {
    expect(setup(false).prop('chapterItem')).toEqual(undefined);
  });

  it('should find "ChapterItem" component', () => {
    const divElement = setup(true).shallow();
    expect(divElement.find("ChapterItem")).toBeTruthy();
  });

  it('children prop should be false', () => {
    const divElement = setup(false).shallow();
    expect(divElement.prop('children')).toBeFalsy();
  });
});
