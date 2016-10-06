/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as forumActions from "../forumActions";
import {forums} from "../../api/__fakeData__/_all";


describe('forumActions', () => {
  it('should create an action to get forum by chapter id', () => {
    const chapterId = 1;
    const expectedAction = {
      type: types.GET_FORUMS_BY_CHAPTER_ID,
      chapterId
    };
    expect(forumActions.getForumsByChapterId(chapterId)).toEqual(expectedAction);
  });

  it('should create an action to get forum by chapter id on success', () => {
    const chapterId = 1;
    const expectedAction = {
      type: types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS,
      chapterId,
      forums
    };
    expect(forumActions.getForumsByChapterIdSuccess(chapterId, forums)).toEqual(expectedAction);
  });
});
