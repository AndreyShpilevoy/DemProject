/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import ForumListConnected, {ForumList} from "../ForumList";

const mockStore = configureMockStore();
const storeStateMock = {
  forumReducer:{
    allForums: [{
      chapterId: 3,
      forumList: [{
        id: 1,
        order: 1,
        title: "Общие вопросы",
        description: "Все вопросы касательно геймплея и мира игры Ex Machina в целом.",
        topicsCount: 26,
        postsCount: 4113,
        lastActiveTopicId: 1,
        lastActiveTopic: "Идеи к Ex Machina -2 часть четвертая",
        latesPostTimeCreation: new Date("2015/08/17 13:42:32"),
        latesPostAutorId: 1,
        latesPostAutorName: "kto",
        latesPostAutorGroupColor: "ffa510",
        subForumList: [{
            id: 11,
            title: "Самопал",
            order: 35
        },{
            id: 12,
            title: "Архив форумки",
            order: 12
        }]
      }, {
        id: 2,
        order: 2,
        title: "Технические вопросы",
        description: "Вопросы технического характера по игре Ex Machina.",
        topicsCount: 13,
        postsCount: 857,
        lastActiveTopicId: 2,
        lastActiveTopic: "Проблемы с игрой",
        latesPostTimeCreation: new Date("2016/9/22 12:53:09"),
        latesPostAutorId: 2,
        latesPostAutorName: "Bykawka",
        latesPostAutorGroupColor: "fbeab2"
      },{
        id: 3,
        order: 3,
        title: "Обсуждение модификаций",
        description: "Раздел для общих и технических вопросов по модификациям.",
        topicsCount: 37,
        postsCount: 4328,
        lastActiveTopicId: 3,
        lastActiveTopic: "Hard Truck Apocalypse MOD 1.7SE",
        latesPostTimeCreation: new Date("2014/07/02 23:11:31"),
        latesPostAutorId: 3,
        latesPostAutorName: "ololoid",
        latesPostAutorGroupColor: "99ccff",
        subForumList: [{
            id: 31,
            title: "Багтрекер",
            order: 27
        }]
      }]
    }]
  }
};
const mockActions = {
  getForumsByChapterId: function(){}
};


describe('ForumList', () => {
  function setup() {
    const props = {
      store: mockStore(storeStateMock),
      actions: mockActions,
      chapterId: 3
    };
    return shallow(<ForumList {...props}/>, { lifecycleExperimental: true });
  }

  function setupConnected(valid) {
    const props = {
      store: valid ? mockStore(storeStateMock) : mockStore(),
      chapterId: 3
    };
    return shallow(<ForumListConnected {...props}/>);
  }

  it('should call "componentDidMount" once',() => {
    sinon.spy(ForumList.prototype, 'componentDidMount');
    setup();
    expect(ForumList.prototype.componentDidMount.calledOnce).toBeTruthy();
  });

  it('should get "allForums" from "forumReducer" and recieve expected result', () => {
    expect(setupConnected(true).prop('forumList')).toEqual(storeStateMock.forumReducer.allForums[0].forumList);
  });

  it('should get "allForums" from "forumReducer" and recieve empty array', () => {
    expect(setupConnected(false).prop('forumList')).toEqual([]);
  });
});
