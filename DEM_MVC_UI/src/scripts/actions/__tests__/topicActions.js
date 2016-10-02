/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as topicActions from "../topicActions";


describe('topicActions', () => {
  it('should create an action to get topic by forum id', () => {
    const forumId = 1;
    const expectedAction = {
      type: types.GET_TOPICS_BY_FORUM_ID,
      forumId
    };
    expect(topicActions.getTopicsByForumId(forumId)).toEqual(expectedAction);
  });

  it('should create an action to get topic by forum id on success', () => {
    const forumId = 1;
    const topics = [{
        id: 1,
        title: "Как деактивировать бомбу",
        postsCount: 215,
        topicViewsCount: 1315,
        latesPostTimeCreation: new Date("2016/09/19 13:42:32"),
        latesPostAutorId: 4,
        latesPostAutorName: "Buba",
        latesPostAutorAvatart: "http://i70.fastpic.ru/big/2015/0628/36/ccbb1e2cb8ba8dbd379a6a12dc6b8336.jpg",
        latesPostAutorGroupColor: "00AA00"
    }, {
        id: 2,
        title: "Как активировать бомбу.",
        postsCount: 57,
        topicViewsCount: 847,
        latesPostTimeCreation: new Date("2016/09/22 12:53:09"),
        latesPostAutorId: 2,
        latesPostAutorName: "Bykawka",
        latesPostAutorAvatart: undefined,
        latesPostAutorGroupColor: "fbeab2"
    },{
        id: 3,
        title: "Почему админы дебилы [закрыто намертво]",
        postsCount: 218,
        topicViewsCount: 82847,
        latesPostTimeCreation: new Date("2016/07/12 14:24:11"),
        latesPostAutorId: 5,
        latesPostAutorName: "Agent005",
        latesPostAutorAvatart: "https://pp.vk.me/c9558/u61600334/a_153d373f.jpg",
        latesPostAutorGroupColor: "ff00ff"
    }];

    const expectedAction = {
      type: types.GET_TOPICS_BY_FORUM_ID_SUCCESS,
      forumId,
      topics
    };
    expect(topicActions.getTopicsByForumIdSuccess(forumId, topics)).toEqual(expectedAction);
  });
});
