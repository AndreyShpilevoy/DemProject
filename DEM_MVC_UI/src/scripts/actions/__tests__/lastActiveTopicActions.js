/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as lastActiveTopicActions from "../lastActiveTopicActions";


describe('lastActiveTopicActions', () => {
  it('should create an action to get Navigation Links', () => {
    const expectedAction = {type: types.GET_LAST_ACTIVE_TOPICS};
    expect(lastActiveTopicActions.getLastActiveTopics()).toEqual(expectedAction);
  });

  it('should create an action to get Navigation Links on success', () => {
    const lastActiveTopics = [{
        id: 1,
        title: "Как деактивировать бомбу",
        postsCount: 215,
        topicViewsCount: 1315,
        latesPostTimeCreation: new Date("2016/09/19 13:42:32"),
        latesPostAutorId: 4,
        latesPostAutorName: "Buba",
        latesPostAutorAvatart: "http://i70.fastpic.ru/big/2015/0628/36/ccbb1e2cb8ba8dbd379a6a12dc6b8336.jpg",
        latesPostAutorGroupColor: "00AA00",
        parentForumId: 10,
        parentForumTitle: "Общие вопросы"
    }, {
        id: 2,
        title: "Как активировать бомбу.",
        postsCount: 57,
        topicViewsCount: 847,
        latesPostTimeCreation: new Date("2016/09/22 12:53:09"),
        latesPostAutorId: 2,
        latesPostAutorName: "Bykawka",
        latesPostAutorAvatart: undefined,
        latesPostAutorGroupColor: "fbeab2",
        parentForumId: 20,
        parentForumTitle: "Технические вопросы"
    }];
    const expectedAction = {
      type: types.GET_LAST_ACTIVE_TOPICS_SUCCESS,
      lastActiveTopics
    };
    expect(lastActiveTopicActions.getLastActiveTopicsSuccess(lastActiveTopics)).toEqual(expectedAction);
  });
});
