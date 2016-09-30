/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as chapterActions from "../chapterActions";

describe('chapterActions', () => {
  it('should create an action to get all chapters', () => {
    const expectedAction = {type: types.GET_ALL_CHAPTERS};
    expect(chapterActions.getAllChapters()).toEqual(expectedAction);
  });

  it('should create an action to get all chapters on success', () => {
    const allChapters = [{id: 1, title: "Ex Machina", order: 1},{id: 2, title: "Ex Machina Меридиан 113", order: 2},];
    const expectedAction = {
      type: types.GET_ALL_CHAPTERS_SUCCESS,
      allChapters
    };
    expect(chapterActions.getAllChaptersSuccess(allChapters)).toEqual(expectedAction);
  });

  it('should create an action to get chapter by id', () => {
    const chapterId = 1;
    const expectedAction = {
      type: types.GET_CHAPTER_BY_ID,
      chapterId
    };
    expect(chapterActions.getChapterById(chapterId)).toEqual(expectedAction);
  });

  it('should not create an action to get chapter by id', () => {
    expect(chapterActions.getChapterById()).toEqual(undefined);
  });

  it('should create an action to get chapter by id', () => {
    const chapterById = {id: 1, title: "Ex Machina", order: 1};
    const expectedAction = {
      type: types.GET_CHAPTER_BY_ID_SUCCESS,
      chapterById
    };
    expect(chapterActions.getChapterByIdSuccess(chapterById)).toEqual(expectedAction);
  });
});
