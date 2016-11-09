/*eslint no-undef: "off"*/

import * as types from "enums/actionTypes";
import forumReducer from "reducers/forumReducer";
import * as fakeData from "api/__fakeData__/index";

describe('forumReducer', function(){
  it('returns an empty array as default state', function(){
    let action = { type: 'unknown' };

    expect(forumReducer(undefined, action)).toEqual([]);
  });

  it('should return "state" without changes if Action Type wasnt handled and "state" has predifined data', function(){
    let action = { type: 'unknown' };
    let state = {
      allForums:  [
        {chapterId: 2, forumArray: [fakeData.forums[2]]}
      ]
    };
    expect(forumReducer(state, action)).toEqual(state);
  });

  it('should return "state" with "allForums" array, that contain one expected element. ActionType "GET_FORUMS_BY_CHAPTER_ID_SUCCESS", "state" is empty', function(){
    let action = {
      type: types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS,
      forums: [fakeData.forums[2], fakeData.forums[0], fakeData.forums[1]],
      chapterId: 1
    };

    expect(forumReducer(undefined, action)).toEqual({allForums: [
      {chapterId: action.chapterId, forumArray: action.forums}
    ]});
  });

  it('should return "state" with "allForums" array, that contain two elements - one prefilled and second is expected. ActionType "GET_FORUMS_BY_CHAPTER_ID_SUCCESS", "state" has prefilled data with diferent chapterId', function(){
    let action = {
      type: types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS,
      forums: [fakeData.forums[0], fakeData.forums[1]],
      chapterId: 1
    };

    let state = {
      allForums:  [
        {chapterId: 2, forumArray: [fakeData.forums[2]]}
      ]
    };

    expect(forumReducer(state, action)).toEqual({allForums: [
      state.allForums[0],
      {chapterId: action.chapterId, forumArray: action.forums}
    ]});
  });

  it('should return "state" with "allForums" array, that contain one expected element that replaced prefilled data. ActionType "GET_FORUMS_BY_CHAPTER_ID_SUCCESS", "state" has prefilled data with same chapterId', function(){
    let action = {
      type: types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS,
      forums: [fakeData.forums[0], fakeData.forums[1]],
      chapterId: 1
    };

    let state = {
      allForums:  [
        {chapterId: 1, forumArray: [fakeData.forums[2]]}
      ]
    };

    expect(forumReducer(state, action)).toEqual({allForums: [
      {chapterId: action.chapterId, forumArray: action.forums}
    ]});
  });
});
