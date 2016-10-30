/*eslint no-undef: "off"*/

import * as types from "enums/actionTypes";
import postReducer from "reducers/postReducer";
import * as fakeData from "api/__fakeData__/index";

describe('postReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = postReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>allPosts</code> in given action GET_POSTS_BY_TOPIC_ID_SUCCESS when state is empty.allPosts array', function(){
    // setup
    let action = {
      type: types.GET_POSTS_BY_TOPIC_ID_SUCCESS,
      allPosts: [fakeData.posts[2],fakeData.posts[0],fakeData.posts[1]]
    };
    // execute
    let newState = postReducer(undefined, action);
    // verify
    expect(newState).toEqual({allPosts:  [
      {topicId: action.topicId, postArray: action.posts}
    ]});
  });


  it('returns the <code>allPosts</code> in given action GET_POSTS_BY_TOPIC_ID_SUCCESS when state.allPosts is not empty ', function(){
    // setup
    let preloadedPost = fakeData.posts[3];
    let action = {
      type: types.GET_POSTS_BY_TOPIC_ID_SUCCESS,
      allPosts: [fakeData.posts[2],fakeData.posts[0],fakeData.posts[1]]
    };
    // execute
    let newState = postReducer({allPosts:  [
      {topicId: preloadedPost.topicId, postArray: preloadedPost.posts}
    ]}, action);
    // verify
    expect(newState).toEqual({allPosts:  [
      {topicId: preloadedPost.topicId, postArray: preloadedPost.posts},
      {topicId: action.topicId, postArray: action.posts}
    ]});
  });
});
