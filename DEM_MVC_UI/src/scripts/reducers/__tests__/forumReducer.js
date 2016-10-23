/*eslint no-undef: "off"*/

import * as types from "actions/actionTypes";
import forumReducer from "reducers/forumReducer";
import * as fakeData from "api/__fakeData__/index";

describe('forumReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = forumReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>allForums</code> in given action GET_FORUMS_BY_CHAPTER_ID_SUCCESS when state is empty.allForums array', function(){
    // setup
    let action = {
      type: types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS,
      allForums: [fakeData.forums[2], fakeData.forums[0], fakeData.forums[1]]
    };
    // execute
    let newState = forumReducer(undefined, action);
    // verify
    expect(newState).toEqual({allForums:  [
      {chapterId: action.chapterId, forumArray: action.forums}
    ]});
  });


  it('returns the <code>allForums</code> in given action GET_FORUMS_BY_CHAPTER_ID_SUCCESS when state.allForums is not empty ', function(){
    // setup
    let preloadedForum = fakeData.forums[3];
    let action = {
      type: types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS,
      allForums: [fakeData.forums[2], fakeData.forums[0], fakeData.forums[1]]
    };
    // execute
    let newState = forumReducer({allForums:  [
      {chapterId: preloadedForum.chapterId, forumArray: preloadedForum.forums}
    ]}, action);
    // verify
    expect(newState).toEqual({allForums:  [
      {chapterId: preloadedForum.chapterId, forumArray: preloadedForum.forums},
      {chapterId: action.chapterId, forumArray: action.forums}
    ]});
  });
});
