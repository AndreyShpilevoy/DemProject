/*eslint no-undef: "off"*/

import * as chapterSagas from "../chapterSagas";
import ChapterApi from "../../api/__mocks__/ChapterApi";
import CheckObject from "../../../../testHelpers/CheckObject";

describe('chapterSagas', () => {
  it('getAllChaptersGenerator first yeald should return TAKE pattern "GET_ALL_CHAPTERS"', () => {
    const getAllChaptersGenerator = chapterSagas.getAllChapters();

    expect(getAllChaptersGenerator.next().value.TAKE.pattern)
      .toEqual('GET_ALL_CHAPTERS');
  });

  it('getAllChaptersGenerator second yeald should return CALL to function "ChapterApi.getAllChapters"', () => {
    const getAllChaptersGenerator = chapterSagas.getAllChapters();

    getAllChaptersGenerator.next();

    expect(getAllChaptersGenerator.next().value.CALL.fn)
      .toEqual(ChapterApi.getAllChapters);
  });

  it('getAllChaptersGenerator third yeald should return PUT action.type "GET_ALL_CHAPTERS_SUCCESS"', () => {
    const getAllChaptersGenerator = chapterSagas.getAllChapters();
    const allChapters = ChapterApi.getAllChapters();

    getAllChaptersGenerator.next();
    getAllChaptersGenerator.next();

    expect(getAllChaptersGenerator.next(allChapters).value.PUT.action.type)
      .toEqual('GET_ALL_CHAPTERS_SUCCESS');
  });

  it('getAllChaptersGenerator third yeald should return PUT action.allChapters that is a Promise', () => {
    const getAllChaptersGenerator = chapterSagas.getAllChapters();
    const allChapters = ChapterApi.getAllChapters();

    getAllChaptersGenerator.next();
    getAllChaptersGenerator.next();

    expect(CheckObject.IsPromise(getAllChaptersGenerator.next(allChapters).value.PUT.action.allChapters))
      .toBeTruthy();
  });

  it('getChapterByIdGenerator first yeald should return TAKE pattern "GET_CHAPTER_BY_ID"', () => {
    const getChapterByIdGenerator = chapterSagas.getChapterById();

    expect(getChapterByIdGenerator.next().value.TAKE.pattern)
      .toEqual('GET_CHAPTER_BY_ID');
  });

  it('getChapterByIdGenerator second yeald should return CALL to function "ChapterApi.getChapterById"', () => {
    const getChapterByIdGenerator = chapterSagas.getChapterById();

    getChapterByIdGenerator.next();

    expect(getChapterByIdGenerator.next({}).value.CALL.fn)
      .toEqual(ChapterApi.getChapterById);
  });

  it('getChapterByIdGenerator third yeald should return PUT action.type "GET_CHAPTER_BY_ID_SUCCESS"', () => {
    const getChapterByIdGenerator = chapterSagas.getChapterById();
    const chapterById = ChapterApi.getChapterById();

    getChapterByIdGenerator.next();
    getChapterByIdGenerator.next({});

    expect(getChapterByIdGenerator.next(chapterById).value.PUT.action.type)
      .toEqual('GET_CHAPTER_BY_ID_SUCCESS');
  });

  it('getChapterByIdGenerator third yeald should return PUT action.chapterById that is a Promise', () => {
    const getChapterByIdGenerator = chapterSagas.getChapterById();
    const chapterById = ChapterApi.getChapterById();

    getChapterByIdGenerator.next();
    getChapterByIdGenerator.next({});

    expect(CheckObject.IsPromise(getChapterByIdGenerator.next(chapterById).value.PUT.action.chapterById))
      .toBeTruthy();
  });
});
