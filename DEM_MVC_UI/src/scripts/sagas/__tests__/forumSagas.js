/*eslint no-undef: 'off'*/

import * as forumSagas from 'sagas/forumSagas';
import ForumApi from 'api/__mocks__/ForumApi';
import CheckObject from 'testHelpers/CheckObject';


describe('forumSagas', () => {
  it('getForumsByChapterId first yeald should return TAKE pattern "GET_FORUMS_BY_CHAPTER_ID"', () => {
    const generator = forumSagas.getForumsByChapterId();

    expect(generator.next({}).value.TAKE.pattern).toEqual('GET_FORUMS_BY_CHAPTER_ID');
  });
  it('getForumsByChapterId second yeald should return FORK to function "getForumsByChapterIdNonBlock"', () => {
    const generator = forumSagas.getForumsByChapterId();

    generator.next({});
    expect(generator.next({}).value.FORK.fn).toEqual(forumSagas.getForumsByChapterIdNonBlock);
  });


  it('getForumsByChapterIdNonBlock second yeald should return CALL to function "ForumApi.getForumsByChapterId"', () => {
    const testChapterId = 1;
    const generator = forumSagas.getForumsByChapterIdNonBlock(testChapterId);

    expect(generator.next().value.CALL.fn).toEqual(ForumApi.getForumsByChapterId);
  });
  it('getForumsByChapterIdNonBlock third yeald should return PUT action.type "GET_FORUMS_BY_CHAPTER_ID_SUCCESS"', () => {
    const testChapterId = 1;
    const generator = forumSagas.getForumsByChapterIdNonBlock(testChapterId);
    const forumsByChapterId = ForumApi.getForumsByChapterId(testChapterId);

    generator.next();
    expect(generator.next(forumsByChapterId).value.PUT.action.type).toEqual('GET_FORUMS_BY_CHAPTER_ID_SUCCESS');
  });

  it('getForumsByChapterIdNonBlock third yeald should return PUT action.forums that is a Promise', () => {
    const testChapterId = 1;
    const generator = forumSagas.getForumsByChapterIdNonBlock(testChapterId);
    const forumsByChapterId = ForumApi.getForumsByChapterId(testChapterId);

    generator.next();
    expect(CheckObject.IsPromise(generator.next(forumsByChapterId).value.PUT.action.forums)).toBeTruthy();
  });

  it('getForumsByChapterIdNonBlock third yeald should return PUT action.chapterId that is a Promise', () => {
    const testChapterId = 1;
    const generator = forumSagas.getForumsByChapterIdNonBlock(testChapterId);
    const forumsByChapterId = ForumApi.getForumsByChapterId(testChapterId);

    generator.next();
    expect(generator.next(forumsByChapterId).value.PUT.action.chapterId).toEqual(testChapterId);
  });
});
