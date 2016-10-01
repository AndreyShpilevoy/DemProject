/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import ChapterByIdItem from "../ChapterByIdItem";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";


describe('ChapterByIdItem', () => {
  function setup(valid) {
    const props = {
      store: sharedFakeStore(valid),
      actions: mockActions,
      params: {id: 4}
    };
    return shallow(<ChapterByIdItem {...props}/>, { lifecycleExperimental: true });
  }

  it('should call "componentDidMount" once',() => {
    sinon.spy(ChapterByIdItem.prototype, 'componentDidMount');
    setup(true).shallow({ lifecycleExperimental: true });
    expect(ChapterByIdItem.prototype.componentDidMount.calledOnce).toBeTruthy();
  });

  it('should get "chapterById" from "chapterReducer" and recieve expected result', () => {
    expect(setup(true).prop('chapter')).toEqual(sharedFakeStoreData.chapterReducer.chapterById);
  });

  it('should get "chapterById" from "chapterReducer" and recieve expected "undefined"', () => {
    expect(setup(false).prop('chapter')).toEqual(undefined);
  });

  it('should get "children" prop from "ChapterByIdItem" and recieve "Chapter title"', () => {
    const divElement = setup(true).shallow();
    expect(divElement.prop("children")).toBe("Chapter title");
  });

  it('should get "children" prop from "ChapterByIdItem" and recieve "null"', () => {
    const divElement = setup(false).shallow();
    expect(divElement.prop("children")).toBe(null);
  });
});
