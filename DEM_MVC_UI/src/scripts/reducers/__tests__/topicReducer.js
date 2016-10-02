/*eslint no-undef: "off"*/

import * as types from "../../actions/actionTypes";
import topicReducer from "../topicReducer";

describe('topicReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = topicReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>allTopics</code> in given action GET_TOPICS_BY_FORUM_ID_SUCCESS when state is empty.allTopics array', function(){
    // setup
    let action = {
      type: types.GET_TOPICS_BY_FORUM_ID_SUCCESS,
      allTopics:
        [
          {
              id: 1,
              title: "Как деактивировать бомбу",
              postsCount: 215,
              topicViewsCount: 1315,
              latesPostTimeCreation: new Date("2016/09/19 13:42:32"),
              latesPostAutorId: 4,
              latesPostAutorName: "Buba",
              latesPostAutorAvatart: "http://i70.fastpic.ru/big/2015/0628/36/ccbb1e2cb8ba8dbd379a6a12dc6b8336.jpg",
              latesPostAutorGroupColor: "00AA00"
          }
        ]
    };
    // execute
    let newState = topicReducer(undefined, action);
    // verify
    expect(newState).toEqual({allTopics:  [
      {forumId: action.forumId, topicList: action.topics}
    ]});
  });


  it('returns the <code>allTopics</code> in given action GET_TOPICS_BY_FORUM_ID_SUCCESS when state.allTopics is not empty ', function(){
    // setup
    let preloadedTopic = {
                  id: 1,
                  title: "Как деактивировать бомбу",
                  postsCount: 215,
                  topicViewsCount: 1315,
                  latesPostTimeCreation: new Date("2016/09/19 13:42:32"),
                  latesPostAutorId: 4,
                  latesPostAutorName: "Buba",
                  latesPostAutorAvatart: "http://i70.fastpic.ru/big/2015/0628/36/ccbb1e2cb8ba8dbd379a6a12dc6b8336.jpg",
                  latesPostAutorGroupColor: "00AA00"
              };
    let action = {
      type: types.GET_TOPICS_BY_FORUM_ID_SUCCESS,
      allTopics:
        [
          {
              id: 2,
              title: "Как активировать бомбу.",
              postsCount: 57,
              topicViewsCount: 847,
              latesPostTimeCreation: new Date("2016/09/22 12:53:09"),
              latesPostAutorId: 2,
              latesPostAutorName: "Bykawka",
              latesPostAutorAvatart: undefined,
              latesPostAutorGroupColor: "fbeab2"
          }
        ]
    };
    // execute
    let newState = topicReducer({allTopics:  [
      {forumId: preloadedTopic.forumId, topicList: preloadedTopic.topics}
    ]}, action);
    // verify
    expect(newState).toEqual({allTopics:  [
      {forumId: preloadedTopic.forumId, topicList: preloadedTopic.topics},
      {forumId: action.forumId, topicList: action.topics}
    ]});
  });
});
