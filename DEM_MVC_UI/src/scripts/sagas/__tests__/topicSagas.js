/*eslint no-undef: "off"*/

import * as topicSagas from "sagas/topicSagas";
import TopicApi from "api/__mocks__/TopicApi";
import CheckObject from "testHelpers/CheckObject";


describe('topicSagas', () => {
  it('getTopicsByForumId first yeald should return TAKE pattern "GET_TOPICS_BY_FORUM_ID"', () => {
    const generator = topicSagas.getTopicsByForumId();

    expect(generator.next({}).value.TAKE.pattern).toEqual('GET_TOPICS_BY_FORUM_ID');
  });

  it('getTopicsByForumId second yeald should return FORK to function "getTopicsByForumIdNonBlock"', () => {
    const generator = topicSagas.getTopicsByForumId();

    generator.next({});
    expect(generator.next({}).value.FORK.fn).toEqual(topicSagas.getTopicsByForumIdNonBlock);
  });

  it('getTopicsByForumIdNonBlock second yeald should return CALL to function "TopicApi.getTopicsByForumId"', () => {
    const testForumId = 1;
    const generator = topicSagas.getTopicsByForumIdNonBlock(testForumId);

    expect(generator.next().value.CALL.fn).toEqual(TopicApi.getTopicsByForumId);
  });

  it('getTopicsByForumIdNonBlock third yeald should return PUT action.type "GET_TOPICS_BY_FORUM_ID_SUCCESS"', () => {
    const testForumId = 1;
    const generator = topicSagas.getTopicsByForumIdNonBlock(testForumId);
    const forumsByChapterId = TopicApi.getTopicsByForumId(testForumId);

    generator.next();
    expect(generator.next(forumsByChapterId).value.PUT.action.type).toEqual('GET_TOPICS_BY_FORUM_ID_SUCCESS');
  });

  it('getTopicsByForumIdNonBlock third yeald should return PUT action.topics that is a Promise', () => {
    const testForumId = 1;
    const generator = topicSagas.getTopicsByForumIdNonBlock(testForumId);
    const forumsByChapterId = TopicApi.getTopicsByForumId(testForumId);

    generator.next();
    expect(CheckObject.IsPromise(generator.next(forumsByChapterId).value.PUT.action.topics)).toBeTruthy();
  });

  it('getTopicsByForumIdNonBlock third yeald should return PUT action.forumId that is a Promise', () => {
    const testForumId = 1;
    const generator = topicSagas.getTopicsByForumIdNonBlock(testForumId);
    const forumsByChapterId = TopicApi.getTopicsByForumId(testForumId);

    generator.next();
    expect(generator.next(forumsByChapterId).value.PUT.action.forumId).toEqual(testForumId);
  });
});
