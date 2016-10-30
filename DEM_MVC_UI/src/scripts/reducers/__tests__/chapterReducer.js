/*eslint no-undef: "off"*/

import * as types from "enums/actionTypes";
import chapterReducer from "reducers/chapterReducer";
import * as fakeData from "api/__fakeData__/index";

describe('chapterReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = chapterReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>allChapters</code> in given action GET_ALL_CHAPTERS_SUCCESS', function(){
    // setup
    let action = {
      type: types.GET_ALL_CHAPTERS_SUCCESS,
      allChapters: [fakeData.chapters[2], fakeData.chapters[0], fakeData.chapters[1]]
    };
    // execute
    let newState = chapterReducer(undefined, action);
    // verify
    expect(newState).toEqual({allChapters:  action.allChapters});
  });

  it('returns the <code>chapterById</code> in given action GET_CHAPTER_BY_ID_SUCCESS', function(){
    // setup
    let action = {
      type: types.GET_CHAPTER_BY_ID_SUCCESS,
      chapterById: fakeData.chapters[0]
    };
    // execute
    let newState = chapterReducer(undefined, action);
    // verify
    expect(newState).toEqual({chapterById:  action.chapterById});
  });
});
