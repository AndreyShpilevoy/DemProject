/*eslint no-undef: 'off'*/

import * as chapterSagas from 'sagas/chapterSagas';
import ChapterApi from 'api/__mocks__/ChapterApi';
import CheckObject from 'testHelpers/CheckObject';

describe('chapterSagas', () => {
  it('getAllChapters first yeald should return TAKE pattern "GET_ALL_CHAPTERS"', () => {
    const generator = chapterSagas.getAllChapters();

    expect(generator.next().value.TAKE.pattern).toEqual('GET_ALL_CHAPTERS');
  });
  it('getAllChapters second yeald should return CALL to function "ChapterApi.getAllChapters"', () => {
    const generator = chapterSagas.getAllChapters();

    generator.next();
    expect(generator.next().value.CALL.fn).toEqual(ChapterApi.getAllChapters);
  });
  it('getAllChapters third yeald should return PUT action.type "GET_ALL_CHAPTERS_SUCCESS"', () => {
    const generator = chapterSagas.getAllChapters();
    const allChapters = ChapterApi.getAllChapters();

    generator.next();
    generator.next();
    expect(generator.next(allChapters).value.PUT.action.type).toEqual('GET_ALL_CHAPTERS_SUCCESS');
  });
  it('getAllChapters third yeald should return PUT action.allChapters that is a Promise', () => {
    const generator = chapterSagas.getAllChapters();
    const allChapters = ChapterApi.getAllChapters();

    generator.next();
    generator.next();
    expect(CheckObject.IsPromise(generator.next(allChapters).value.PUT.action.allChapters)).toBeTruthy();
  });


  it('getChapterById first yeald should return TAKE pattern "GET_CHAPTER_BY_ID"', () => {
    const generator = chapterSagas.getChapterById();

    expect(generator.next().value.TAKE.pattern).toEqual('GET_CHAPTER_BY_ID');
  });
  it('getChapterById second yeald should return CALL to function "ChapterApi.getChapterById"', () => {
    const generator = chapterSagas.getChapterById();

    generator.next();
    expect(generator.next({}).value.CALL.fn).toEqual(ChapterApi.getChapterById);
  });
  it('getChapterById third yeald should return PUT action.type "GET_CHAPTER_BY_ID_SUCCESS"', () => {
    const generator = chapterSagas.getChapterById();
    const chapterById = ChapterApi.getChapterById();

    generator.next();
    generator.next({});
    expect(generator.next(chapterById).value.PUT.action.type).toEqual('GET_CHAPTER_BY_ID_SUCCESS');
  });
  it('getChapterById third yeald should return PUT action.chapterById that is a Promise', () => {
    const generator = chapterSagas.getChapterById();
    const chapterById = ChapterApi.getChapterById();

    generator.next();
    generator.next({});
    expect(CheckObject.IsPromise(generator.next(chapterById).value.PUT.action.chapterById)).toBeTruthy();
  });
});
