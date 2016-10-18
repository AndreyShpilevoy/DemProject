/*eslint no-undef: "off"*/

import * as breadcrumbsSagas from "../breadcrumbsSagas";
import BreadcrumbsApi from "../../api/__mocks__/BreadcrumbsApi";
import CheckObject from "../../../../testHelpers/CheckObject";


describe('breadcrumbsSagas', () => {
  it('getForumBreadcrumbsGenerator first yeald should return TAKE pattern "GET_FORUM_BREADCRUMBS"', () => {
    const getForumBreadcrumbsGenerator = breadcrumbsSagas.getForumBreadcrumbs();

    expect(getForumBreadcrumbsGenerator.next({}).value.TAKE.pattern)
      .toEqual('GET_FORUM_BREADCRUMBS');
  });

  it('getForumBreadcrumbsGenerator second yeald should return FORK to function "getBreadcrumbsByIdNonBlock"', () => {
    const getForumBreadcrumbsGenerator = breadcrumbsSagas.getForumBreadcrumbs();

    getForumBreadcrumbsGenerator.next({});
    expect(getForumBreadcrumbsGenerator.next({}).value.FORK.fn)
      .toEqual(breadcrumbsSagas.getBreadcrumbsByIdNonBlock);
  });

  it('getTopicBreadcrumbsGenerator first yeald should return TAKE pattern "GET_TOPIC_BREADCRUMBS"', () => {
    const getTopicBreadcrumbsGenerator = breadcrumbsSagas.getTopicBreadcrumbs();

    expect(getTopicBreadcrumbsGenerator.next({}).value.TAKE.pattern)
      .toEqual('GET_TOPIC_BREADCRUMBS');
  });

  it('getTopicBreadcrumbsGenerator second yeald should return FORK to function "getBreadcrumbsByIdNonBlock"', () => {
    const getTopicBreadcrumbsGenerator = breadcrumbsSagas.getTopicBreadcrumbs();

    getTopicBreadcrumbsGenerator.next({});
    expect(getTopicBreadcrumbsGenerator.next({}).value.FORK.fn)
      .toEqual(breadcrumbsSagas.getBreadcrumbsByIdNonBlock);
  });

  it('getBreadcrumbsByIdNonBlockGenerator second yeald should return CALL to function "BreadcrumbsApi.getForumBreadcrumbs" if call from getForumBreadcrumbs', () => {
    const testForumId = 1;
    const getBreadcrumbsByIdNonBlockGenerator = breadcrumbsSagas.getBreadcrumbsByIdNonBlock(BreadcrumbsApi.getForumBreadcrumbs, testForumId);

    expect(getBreadcrumbsByIdNonBlockGenerator.next().value.CALL.fn)
      .toEqual(BreadcrumbsApi.getForumBreadcrumbs);
  });

  it('getBreadcrumbsByIdNonBlockenerator third yeald should return PUT action.type "GET_BREADCRUMBS_SUCCESS" if call from getForumBreadcrumbs', () => {
    const testForumId = 1;
    const getBreadcrumbsByIdNonBlockGenerator = breadcrumbsSagas.getBreadcrumbsByIdNonBlock(BreadcrumbsApi.getForumBreadcrumbs, testForumId);
    const forumsByChapterId = BreadcrumbsApi.getForumBreadcrumbs(testForumId);

    getBreadcrumbsByIdNonBlockGenerator.next();

    expect(getBreadcrumbsByIdNonBlockGenerator.next(forumsByChapterId).value.PUT.action.type)
      .toEqual('GET_BREADCRUMBS_SUCCESS');
  });

  it('getBreadcrumbsByIdNonBlockGenerator third yeald should return PUT action.breadcrumbs that is a Promise if call from getForumBreadcrumbs', () => {
    const testForumId = 1;
    const getBreadcrumbsByIdNonBlockGenerator = breadcrumbsSagas.getBreadcrumbsByIdNonBlock(BreadcrumbsApi.getForumBreadcrumbs, testForumId);
    const forumsByChapterId = BreadcrumbsApi.getForumBreadcrumbs(testForumId);

    getBreadcrumbsByIdNonBlockGenerator.next();
    expect(CheckObject.IsPromise(getBreadcrumbsByIdNonBlockGenerator.next(forumsByChapterId).value.PUT.action.breadcrumbs))
      .toBeTruthy();
  });



  it('getBreadcrumbsByIdNonBlockGenerator second yeald should return CALL to function "BreadcrumbsApi.getTopicBreadcrumbs" if call from getTopicBreadcrumbs', () => {
    const testTopicId = 1;
    const getBreadcrumbsByIdNonBlockGenerator = breadcrumbsSagas.getBreadcrumbsByIdNonBlock(BreadcrumbsApi.getTopicBreadcrumbs, testTopicId);

    expect(getBreadcrumbsByIdNonBlockGenerator.next().value.CALL.fn)
      .toEqual(BreadcrumbsApi.getTopicBreadcrumbs);
  });

  it('getBreadcrumbsByIdNonBlockenerator third yeald should return PUT action.type "GET_BREADCRUMBS_SUCCESS" if call from getTopicBreadcrumbs', () => {
    const testTopicId = 1;
    const getBreadcrumbsByIdNonBlockGenerator = breadcrumbsSagas.getBreadcrumbsByIdNonBlock(BreadcrumbsApi.getTopicBreadcrumbs, testTopicId);
    const topicsByChapterId = BreadcrumbsApi.getTopicBreadcrumbs(testTopicId);

    getBreadcrumbsByIdNonBlockGenerator.next();

    expect(getBreadcrumbsByIdNonBlockGenerator.next(topicsByChapterId).value.PUT.action.type)
      .toEqual('GET_BREADCRUMBS_SUCCESS');
  });

  it('getBreadcrumbsByIdNonBlockGenerator third yeald should return PUT action.breadcrumbs that is a Promise if call from getTopicBreadcrumbs', () => {
    const testTopicId = 1;
    const getBreadcrumbsByIdNonBlockGenerator = breadcrumbsSagas.getBreadcrumbsByIdNonBlock(BreadcrumbsApi.getTopicBreadcrumbs, testTopicId);
    const topicsByChapterId = BreadcrumbsApi.getTopicBreadcrumbs(testTopicId);

    getBreadcrumbsByIdNonBlockGenerator.next();
    expect(CheckObject.IsPromise(getBreadcrumbsByIdNonBlockGenerator.next(topicsByChapterId).value.PUT.action.breadcrumbs))
      .toBeTruthy();
  });
});
