/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as forumActions from "../forumActions";


describe('forumActions', () => {
  it('should create an action to get forum by chapter id', () => {
    const chapterId = 1;
    const expectedAction = {
      type: types.GET_FORUMS_BY_CHAPTER_ID,
      chapterId
    };
    expect(forumActions.getForumsByChapterId(chapterId)).toEqual(expectedAction);
  });

  it('should create an action to get forum by chapter id on success', () => {
    const chapterId = 1;
    const forums = [{
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
    }];

    const expectedAction = {
      type: types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS,
      chapterId,
      forums
    };
    expect(forumActions.getForumsByChapterIdSuccess(chapterId, forums)).toEqual(expectedAction);
  });
});
