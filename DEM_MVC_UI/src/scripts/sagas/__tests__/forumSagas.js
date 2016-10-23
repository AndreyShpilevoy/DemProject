/*eslint no-undef: "off"*/

import * as forumSagas from "sagas/forumSagas";
import ForumApi from "api/__mocks__/ForumApi";
import CheckObject from "testHelpers/CheckObject";


describe('forumSagas', () => {
  it('getForumsByChapterIdGenerator first yeald should return TAKE pattern "GET_FORUMS_BY_CHAPTER_ID"', () => {
    const getForumsByChapterIdGenerator = forumSagas.getForumsByChapterId();

    expect(getForumsByChapterIdGenerator.next({}).value.TAKE.pattern)
      .toEqual('GET_FORUMS_BY_CHAPTER_ID');
  });

  it('getForumsByChapterIdGenerator second yeald should return FORK to function "getForumsByChapterIdNonBlock"', () => {
    const getForumsByChapterIdGenerator = forumSagas.getForumsByChapterId();

    getForumsByChapterIdGenerator.next({});
    expect(getForumsByChapterIdGenerator.next({}).value.FORK.fn)
      .toEqual(forumSagas.getForumsByChapterIdNonBlock);
  });

  it('getForumsByChapterIdGenerator second yeald should return CALL to function "ForumApi.getForumsByChapterId"', () => {
    const testChapterId = 1;
    const getForumsByChapterIdGenerator = forumSagas.getForumsByChapterIdNonBlock(testChapterId);

    expect(getForumsByChapterIdGenerator.next().value.CALL.fn)
      .toEqual(ForumApi.getForumsByChapterId);
  });

  it('getForumsByChapterIdGenerator third yeald should return PUT action.type "GET_FORUMS_BY_CHAPTER_ID_SUCCESS"', () => {
    const testChapterId = 1;
    const getForumsByChapterIdGenerator = forumSagas.getForumsByChapterIdNonBlock(testChapterId);
    const forumsByChapterId = ForumApi.getForumsByChapterId(testChapterId);

    getForumsByChapterIdGenerator.next();

    expect(getForumsByChapterIdGenerator.next(forumsByChapterId).value.PUT.action.type)
      .toEqual('GET_FORUMS_BY_CHAPTER_ID_SUCCESS');
  });

  it('getForumsByChapterIdGenerator third yeald should return PUT action.forums that is a Promise', () => {
    const testChapterId = 1;
    const getForumsByChapterIdGenerator = forumSagas.getForumsByChapterIdNonBlock(testChapterId);
    const forumsByChapterId = ForumApi.getForumsByChapterId(testChapterId);

    getForumsByChapterIdGenerator.next();

    expect(CheckObject.IsPromise(getForumsByChapterIdGenerator.next(forumsByChapterId).value.PUT.action.forums))
      .toBeTruthy();
  });

  it('getForumsByChapterIdGenerator third yeald should return PUT action.chapterId that is a Promise', () => {
    const testChapterId = 1;
    const getForumsByChapterIdGenerator = forumSagas.getForumsByChapterIdNonBlock(testChapterId);
    const forumsByChapterId = ForumApi.getForumsByChapterId(testChapterId);

    getForumsByChapterIdGenerator.next();

    expect(getForumsByChapterIdGenerator.next(forumsByChapterId).value.PUT.action.chapterId)
      .toEqual(testChapterId);
  });
});
