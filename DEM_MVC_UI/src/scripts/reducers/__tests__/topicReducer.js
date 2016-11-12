/*eslint no-undef: 'off'*/

import * as types from 'enums/actionTypes';
import topicReducer from 'reducers/topicReducer';
import * as fakeData from 'api/__fakeData__/index';

describe('topicReducer', function(){
  it('returns an empty array as default state', function(){
    let action = { type: 'unknown' };

    expect(topicReducer(undefined, action)).toEqual([]);
  });

  it('should return "state" without changes if Action Type wasnt handled and "state" has predifined data', function(){
    let action = { type: 'unknown' };
    let state = {
      allTopics:  [
        {forumId: 2, topicArray: [fakeData.topics[2]]}
      ]
    };
    expect(topicReducer(state, action)).toEqual(state);
  });

  it('should return "state" with "allTopics" array, that contain one expected element. ActionType "GET_TOPICS_BY_FORUM_ID_SUCCESS", "state" is empty', function(){
    let action = {
      type: types.GET_TOPICS_BY_FORUM_ID_SUCCESS,
      topics: [fakeData.topics[2], fakeData.topics[0], fakeData.topics[1]],
      forumId: 1
    };

    expect(topicReducer(undefined, action)).toEqual({allTopics: [
      {forumId: action.forumId, topicArray: action.topics}
    ]});
  });

  it('should return "state" with "allTopics" array, that contain two elements - one prefilled and second is expected. ActionType "GET_TOPICS_BY_FORUM_ID_SUCCESS", "state" has prefilled data with diferent forumId', function(){
    let action = {
      type: types.GET_TOPICS_BY_FORUM_ID_SUCCESS,
      topics: [fakeData.topics[0], fakeData.topics[1]],
      forumId: 1
    };

    let state = {
      allTopics:  [
        {forumId: 2, topicArray: [fakeData.topics[2]]}
      ]
    };

    expect(topicReducer(state, action)).toEqual({allTopics: [
      state.allTopics[0],
      {forumId: action.forumId, topicArray: action.topics}
    ]});
  });

  it('should return "state" with "allTopics" array, that contain one expected element that replaced prefilled data. ActionType "GET_TOPICS_BY_FORUM_ID_SUCCESS", "state" has prefilled data with same forumId', function(){
    let action = {
      type: types.GET_TOPICS_BY_FORUM_ID_SUCCESS,
      topics: [fakeData.topics[0], fakeData.topics[1]],
      forumId: 2
    };

    let state = {
      allTopics:  [
        {forumId: 1, topicArray: [fakeData.topics[2]]},
        {forumId: 2, topicArray: [fakeData.topics[2]]},
        {forumId: 3, topicArray: [fakeData.topics[2]]}
      ]
    };

    expect(topicReducer(state, action)).toEqual({allTopics: [
      {forumId: 1, topicArray: [fakeData.topics[2]]},
      {forumId: action.forumId, topicArray: action.topics},
      {forumId: 3, topicArray: [fakeData.topics[2]]}
    ]});
  });
});
