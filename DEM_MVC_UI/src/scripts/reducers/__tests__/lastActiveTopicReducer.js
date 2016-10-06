/*eslint no-undef: "off"*/

import * as types from "../../actions/actionTypes";
import lastActiveTopicReducer from "../lastActiveTopicReducer";

describe('lastActiveTopicReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = lastActiveTopicReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>lastActiveTopics</code> in given action GET_LAST_ACTIVE_TOPICS_SUCCESS', function(){
    // setup
    let action = {
      type: types.GET_LAST_ACTIVE_TOPICS_SUCCESS,
      lastActiveTopics: [
        {
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
        }
      ]
    };
    // execute
    let newState = lastActiveTopicReducer(undefined, action);
    // verify
    expect(newState).toEqual({lastActiveTopics:  action.lastActiveTopics});
  });
});
