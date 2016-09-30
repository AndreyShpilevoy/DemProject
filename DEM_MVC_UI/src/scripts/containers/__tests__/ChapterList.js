/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import ChapterListConnected, {ChapterList} from "../ChapterList";

const mockStore = configureMockStore();
const storeStateMock = {
  chapterReducer:{
    allChapters: [{
      id: 1,
      title: "ChapteItemId-1",
      order: 1,
    },
    {
      id: 3,
      title: "ChapteItemId-3",
      order: 3,
    },
    {
      id: 2,
      title: "ChapteItemId-2",
      order: 2,
    }]
  }
};
const mockActions = {
  getAllChapters: function(){}
};


describe('ChapterList', () => {
  function setup() {
    const props = {
      store: mockStore(storeStateMock),
      actions: mockActions
    };
    return shallow(<ChapterList {...props}/>, { lifecycleExperimental: true });
  }

  function setupConnected() {
    const props = {
      store: mockStore(storeStateMock)
    };
    return shallow(<ChapterListConnected {...props}/>);
  }

  it('should call "componentDidMount" once',() => {
    sinon.spy(ChapterList.prototype, 'componentDidMount');
    setup();
    expect(ChapterList.prototype.componentDidMount.calledOnce).toBeTruthy();
  });

  it('should get "allChapters" from "chapterReducer" and recieve expected result', () => {
    expect(setupConnected().prop('chapterList')).toEqual(storeStateMock.chapterReducer.allChapters);
  });
});
