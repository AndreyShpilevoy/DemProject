/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import ChapterByIdItemConnected, {ChapterByIdItem} from "../ChapterByIdItem";

const mockStore = configureMockStore();
const storeStateMock = {
  chapterReducer:{
    chapterById: {
      id: 4,
      title: "Chapter title",
      order: 4
    }
  }
};
const mockActions = {
  getChapterById: function(){}
};


describe('ChapterByIdItem', () => {
  function setup() {
    const props = {
      store: mockStore(storeStateMock),
      actions: mockActions,
      params: {id: 4}
    };
    return shallow(<ChapterByIdItem {...props}/>, { lifecycleExperimental: true });
  }

  function setupConnected(valid) {
    const props = {
      store: valid ? mockStore(storeStateMock) : mockStore()
    };
    return shallow(<ChapterByIdItemConnected {...props}/>);
  }

  it('should call "componentDidMount" once',() => {
    sinon.spy(ChapterByIdItem.prototype, 'componentDidMount');
    setup();
    expect(ChapterByIdItem.prototype.componentDidMount.calledOnce).toBeTruthy();
  });

  it('should get "chapterById" from "chapterReducer" and recieve expected result', () => {
    expect(setupConnected(true).prop('chapter')).toEqual(storeStateMock.chapterReducer.chapterById);
  });

  it('should get "chapterById" from "chapterReducer" and recieve expected "undefined"', () => {
    expect(setupConnected(false).prop('chapter')).toEqual(undefined);
  });

  it('should get "chapterById" from "chapterReducer" and recieve expected "undefined"', () => {
    const divElement = setupConnected(true).shallow();
    expect(divElement.prop("children")).toBe("Chapter title");
  });
});
