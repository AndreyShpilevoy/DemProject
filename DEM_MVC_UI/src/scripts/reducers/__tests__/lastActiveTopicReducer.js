/*eslint no-undef: 'off'*/

import * as types from 'enums/actionTypes';
import lastActiveTopicReducer from 'reducers/lastActiveTopicReducer';
import * as fakeData from 'api/__fakeData__/index';

describe('lastActiveTopicReducer', function(){
  it('returns an empty array as default state', function(){
    let action = { type: 'unknown' };

    expect(lastActiveTopicReducer(undefined, action)).toEqual([]);
  });

  it('should return "state" without changes if Action Type wasnt handled and "state" has predifined data', function(){
    let action = { type: 'unknown' };
    let state = {
      lastActiveTopics: [fakeData.lastActiveTopics[2], fakeData.lastActiveTopics[0], fakeData.lastActiveTopics[1]]
    };
    expect(lastActiveTopicReducer(state, action)).toEqual(state);
  });

  it('should return "state" with "lastActiveTopics" array, that contain three expected elements. ActionType "GET_LAST_ACTIVE_TOPICS_SUCCESS", "state" is empty', function(){
    let action = {
      type: types.GET_LAST_ACTIVE_TOPICS_SUCCESS,
      lastActiveTopics: [fakeData.lastActiveTopics[2], fakeData.lastActiveTopics[0], fakeData.lastActiveTopics[1]]
    };

    expect(lastActiveTopicReducer(undefined, action)).toEqual({lastActiveTopics:  action.lastActiveTopics});
  });

  it('should return "state" with "lastActiveTopics" array, that contain three expected elements. ActionType "GET_LAST_ACTIVE_TOPICS_SUCCESS", "state" has prefilled data', function(){
    let action = {
      type: types.GET_LAST_ACTIVE_TOPICS_SUCCESS,
      lastActiveTopics: [fakeData.lastActiveTopics[2], fakeData.lastActiveTopics[1]]
    };
    let state = {
      lastActiveTopics: [fakeData.lastActiveTopics[0]]
    };

    expect(lastActiveTopicReducer(state, action)).toEqual({lastActiveTopics: action.lastActiveTopics});
  });
});
