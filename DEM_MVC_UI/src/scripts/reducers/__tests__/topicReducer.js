/*eslint no-undef: "off"*/

import * as types from "../../actions/actionTypes";
import topicReducer from "../topicReducer";
import * as fakeData from "../../api/__fakeData__/_all";

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
      allTopics: [fakeData.topics[2],fakeData.topics[0],fakeData.topics[1]]
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
    let preloadedTopic = fakeData.topics[3];
    let action = {
      type: types.GET_TOPICS_BY_FORUM_ID_SUCCESS,
      allTopics: [fakeData.topics[2],fakeData.topics[0],fakeData.topics[1]]
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
