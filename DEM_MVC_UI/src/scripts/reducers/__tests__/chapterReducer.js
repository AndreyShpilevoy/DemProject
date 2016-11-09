/*eslint no-undef: "off"*/

import * as types from "enums/actionTypes";
import chapterReducer from "reducers/chapterReducer";
import * as fakeData from "api/__fakeData__/index";

describe('chapterReducer', function(){
  it('should return empty array if Action Type wasnt handled and Store is empty', function(){
    let action = { type: 'unknown' };

    expect(chapterReducer(undefined, action)).toEqual([]);
  });

  it('should return "state" without changes if Action Type wasnt handled and "state" has predifined data', function(){
    let action = { type: 'unknown' };
    let state = {
      allChapters: [fakeData.chapters[0],fakeData.chapters[1]]
    };
    expect(chapterReducer(state, action)).toEqual(state);
  });

  it('should return "state" with "allChapters" array, that contain three expected elements from action. ActionType "GET_ALL_CHAPTERS_SUCCESS", "state" is empty', function(){
    let action = {
      type: types.GET_ALL_CHAPTERS_SUCCESS,
      allChapters: [fakeData.chapters[2], fakeData.chapters[0], fakeData.chapters[1]]
    };

    expect(chapterReducer(undefined, action)).toEqual({allChapters:  action.allChapters});
  });

  it('should return "state" with "allChapters" array, that contain two expected elements from action which replaced prefilled data. ActionType "GET_ALL_CHAPTERS_SUCCESS", "state" has prefilled data', function(){
    let action = {
      type: types.GET_ALL_CHAPTERS_SUCCESS,
      allChapters: [fakeData.chapters[0], fakeData.chapters[1]]
    };
    let state = {
      allChapters: [fakeData.chapters[2]]
    };

    expect(chapterReducer(state, action)).toEqual({allChapters:  action.allChapters});
  });

  it('should return "state" with "chapterById" that contain expected element from action. ActionType "GET_CHAPTER_BY_ID_SUCCESS", "state" is empty', function(){
    let action = {
      type: types.GET_CHAPTER_BY_ID_SUCCESS,
      chapterById: fakeData.chapters[0]
    };

    expect(chapterReducer(undefined, action)).toEqual({chapterById:  action.chapterById});
  });

  it('should return "state" with "chapterById" that contain new element from action that replaced prefilled data. ActionType "GET_CHAPTER_BY_ID_SUCCESS", "state" has prefilled data', function(){
    let action = {
      type: types.GET_CHAPTER_BY_ID_SUCCESS,
      chapterById: fakeData.chapters[0]
    };
    let state = {
      chapterById: fakeData.chapters[1]
    };

    expect(chapterReducer(state, action)).toEqual({chapterById:  action.chapterById});
  });
});
