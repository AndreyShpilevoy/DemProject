/*eslint no-undef: "off"*/

import { call, put, take } from "redux-saga/effects";
import * as chapterSagas from "../chapterSagas";
import ChapterApi from "../../api/__mocks__/ChapterApi";
import * as chapterActions from "../../actions/chapterActions";

describe('chapterSagas', () => {
  it('getAllChapters generator should pass on three steps', () => {
    const chapterSagasGenerator = chapterSagas.getAllChapters();
    const action = {
      type: "GET_ALL_CHAPTERS"
    };
    const allChapters = ChapterApi.getAllChapters();

    expect(chapterSagasGenerator.next(action).value)
      .toEqual(take(action.type));

    expect(chapterSagasGenerator.next().value)
      .toEqual(call(ChapterApi.getAllChapters));

    expect(chapterSagasGenerator.next(allChapters).value)
      .toEqual(put(chapterActions.getAllChaptersSuccess(allChapters)));
  });

  it('getChapterById generator should pass on three steps', () => {
    const chapterSagasGenerator = chapterSagas.getChapterById();
    const action = {
      type: "GET_CHAPTER_BY_ID",
      chapterId: 1
    };
    const chapterById = ChapterApi.getChapterById(action.chapterId);

    expect(chapterSagasGenerator.next(action).value)
      .toEqual(take(action.type));

    expect(chapterSagasGenerator.next(action.chapterId).value)
      .toEqual(call(ChapterApi.getChapterById, undefined));

    expect(chapterSagasGenerator.next(chapterById).value)
      .toEqual(put(chapterActions.getChapterByIdSuccess(chapterById)));
  });
});
