/*eslint no-undef: 'off'*/

import * as breadcrumbsSagas from 'sagas/breadcrumbsSagas';
import BreadcrumbsApi from 'api/__mocks__/BreadcrumbsApi';
import CheckObject from 'testHelpers/CheckObject';


describe('breadcrumbsSagas', () => {

  it('getForumBreadcrumbs first yeald should return TAKE pattern "GET_FORUM_BREADCRUMBS"', () => {
    const generator = breadcrumbsSagas.getForumBreadcrumbs();

    expect(generator.next({}).value.TAKE.pattern).toEqual('GET_FORUM_BREADCRUMBS');
  });
  it('getForumBreadcrumbs second yeald should return FORK to function "getBreadcrumbsByIdNonBlock"', () => {
    const generator = breadcrumbsSagas.getForumBreadcrumbs();
    generator.next({});

    expect(generator.next({}).value.FORK.fn).toEqual(breadcrumbsSagas.getBreadcrumbsByIdNonBlock);
  });


  it('getTopicBreadcrumbs first yeald should return TAKE pattern "GET_TOPIC_BREADCRUMBS"', () => {
    const generator = breadcrumbsSagas.getTopicBreadcrumbs();

    expect(generator.next({}).value.TAKE.pattern).toEqual('GET_TOPIC_BREADCRUMBS');
  });
  it('getTopicBreadcrumbs second yeald should return FORK to function "getBreadcrumbsByIdNonBlock"', () => {
    const generator = breadcrumbsSagas.getTopicBreadcrumbs();
    generator.next({});

    expect(generator.next({}).value.FORK.fn).toEqual(breadcrumbsSagas.getBreadcrumbsByIdNonBlock);
  });


  it('getBreadcrumbsByIdNonBlock second yeald should return CALL to function "BreadcrumbsApi.getForumBreadcrumbs" if call from getForumBreadcrumbs', () => {
    const testForumId = 1;
    const generator = breadcrumbsSagas.getBreadcrumbsByIdNonBlock(BreadcrumbsApi.getForumBreadcrumbs, testForumId);

    expect(generator.next().value.CALL.fn).toEqual(BreadcrumbsApi.getForumBreadcrumbs);
  });
  it('getBreadcrumbsByIdNonBlock third yeald should return PUT action.type "GET_BREADCRUMBS_SUCCESS" if call from getForumBreadcrumbs', () => {
    const testForumId = 1;
    const generator = breadcrumbsSagas.getBreadcrumbsByIdNonBlock(BreadcrumbsApi.getForumBreadcrumbs, testForumId);
    const forumsByChapterId = BreadcrumbsApi.getForumBreadcrumbs(testForumId);

    generator.next();
    expect(generator.next(forumsByChapterId).value.PUT.action.type).toEqual('GET_BREADCRUMBS_SUCCESS');
  });
  it('getBreadcrumbsByIdNonBlock third yeald should return PUT action.breadcrumbArray that is a Promise if call from getForumBreadcrumbs', () => {
    const testForumId = 1;
    const generator = breadcrumbsSagas.getBreadcrumbsByIdNonBlock(BreadcrumbsApi.getForumBreadcrumbs, testForumId);
    const forumsByChapterId = BreadcrumbsApi.getForumBreadcrumbs(testForumId);

    generator.next();
    expect(CheckObject.IsPromise(generator.next(forumsByChapterId).value.PUT.action.breadcrumbArray)).toBeTruthy();
  });
  it('getBreadcrumbsByIdNonBlock second yeald should return CALL to function "BreadcrumbsApi.getTopicBreadcrumbs" if call from getTopicBreadcrumbs', () => {
    const testTopicId = 1;
    const generator = breadcrumbsSagas.getBreadcrumbsByIdNonBlock(BreadcrumbsApi.getTopicBreadcrumbs, testTopicId);

    expect(generator.next().value.CALL.fn).toEqual(BreadcrumbsApi.getTopicBreadcrumbs);
  });

  it('getBreadcrumbsByIdNonBlock third yeald should return PUT action.type "GET_BREADCRUMBS_SUCCESS" if call from getTopicBreadcrumbs', () => {
    const testTopicId = 1;
    const generator = breadcrumbsSagas.getBreadcrumbsByIdNonBlock(BreadcrumbsApi.getTopicBreadcrumbs, testTopicId);
    const topicsByChapterId = BreadcrumbsApi.getTopicBreadcrumbs(testTopicId);

    generator.next();
    expect(generator.next(topicsByChapterId).value.PUT.action.type).toEqual('GET_BREADCRUMBS_SUCCESS');
  });

  it('getBreadcrumbsByIdNonBlock third yeald should return PUT action.breadcrumbArray that is a Promise if call from getTopicBreadcrumbs', () => {
    const testTopicId = 1;
    const generator = breadcrumbsSagas.getBreadcrumbsByIdNonBlock(BreadcrumbsApi.getTopicBreadcrumbs, testTopicId);
    const topicsByChapterId = BreadcrumbsApi.getTopicBreadcrumbs(testTopicId);

    generator.next();
    expect(CheckObject.IsPromise(generator.next(topicsByChapterId).value.PUT.action.breadcrumbArray)).toBeTruthy();
  });
});
