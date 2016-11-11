/*eslint no-undef: 'off'*/

import * as types from 'enums/actionTypes';
import postReducer from 'reducers/postReducer';
import * as fakeData from 'api/__fakeData__/index';

describe('postReducer', function(){
  it('returns an empty array as default state', function(){
    let action = { type: 'unknown' };

    expect(postReducer(undefined, action)).toEqual([]);
  });

  it('should return "state" without changes if Action Type wasnt handled and "state" has predifined data', function(){
    let action = { type: 'unknown' };
    let state = {
      allPosts:  [
        {topicId: 2, postArray: [fakeData.posts[2]]}
      ]
    };
    expect(postReducer(state, action)).toEqual(state);
  });

  it('should return "state" with "allPosts" array, that contain one expected element. ActionType "GET_POSTS_BY_TOPIC_ID_SUCCESS", "state" is empty', function(){
    let action = {
      type: types.GET_POSTS_BY_TOPIC_ID_SUCCESS,
      posts: [fakeData.posts[2], fakeData.posts[0], fakeData.posts[1]],
      topicId: 1
    };

    expect(postReducer(undefined, action)).toEqual({allPosts: [
      {topicId: action.topicId, postArray: action.posts}
    ]});
  });

  it('should return "state" with "allPosts" array, that contain two elements - one prefilled and second is expected. ActionType "GET_POSTS_BY_TOPIC_ID_SUCCESS", "state" has prefilled data with diferent topicId', function(){
    let action = {
      type: types.GET_POSTS_BY_TOPIC_ID_SUCCESS,
      posts: [fakeData.posts[0], fakeData.posts[1]],
      topicId: 1
    };

    let state = {
      allPosts:  [
        {topicId: 2, postArray: [fakeData.posts[2]]}
      ]
    };

    expect(postReducer(state, action)).toEqual({allPosts: [
      state.allPosts[0],
      {topicId: action.topicId, postArray: action.posts}
    ]});
  });

  it('should return "state" with "allPosts" array, that contain one expected element that replaced prefilled data. ActionType "GET_POSTS_BY_TOPIC_ID_SUCCESS", "state" has prefilled data with same topicId', function(){
    let action = {
      type: types.GET_POSTS_BY_TOPIC_ID_SUCCESS,
      posts: [fakeData.posts[0], fakeData.posts[1]],
      topicId: 2
    };

    let state = {
      allPosts:  [
        {topicId: 1, postArray: [fakeData.posts[2]]},
        {topicId: 2, postArray: [fakeData.posts[2]]},
        {topicId: 3, postArray: [fakeData.posts[2]]}
      ]
    };

    expect(postReducer(state, action)).toEqual({allPosts: [
      {topicId: 1, postArray: [fakeData.posts[2]]},
      {topicId: action.topicId, postArray: action.posts},
      {topicId: 3, postArray: [fakeData.posts[2]]}
    ]});
  });
});
