/*eslint no-undef: "off"*/

import * as topicSagas from "../topicSagas";
import TopicApi from "../../api/__mocks__/TopicApi";
import CheckObject from "../../../../testHelpers/CheckObject";


describe('topicSagas', () => {
  it('getTopicsByForumIdGenerator first yeald should return TAKE pattern "GET_TOPICS_BY_FORUM_ID"', () => {
    const getTopicsByForumIdGenerator = topicSagas.getTopicsByForumId();

    expect(getTopicsByForumIdGenerator.next({}).value.TAKE.pattern)
      .toEqual('GET_TOPICS_BY_FORUM_ID');
  });

  it('getTopicsByForumIdGenerator second yeald should return FORK to function "getTopicsByForumIdNonBlock"', () => {
    const getTopicsByForumIdGenerator = topicSagas.getTopicsByForumId();

    getTopicsByForumIdGenerator.next({});
    expect(getTopicsByForumIdGenerator.next({}).value.FORK.fn)
      .toEqual(topicSagas.getTopicsByForumIdNonBlock);
  });

  it('getTopicsByForumIdGenerator second yeald should return CALL to function "TopicApi.getTopicsByForumId"', () => {
    const testForumId = 1;
    const getTopicsByForumIdGenerator = topicSagas.getTopicsByForumIdNonBlock(testForumId);

    expect(getTopicsByForumIdGenerator.next().value.CALL.fn)
      .toEqual(TopicApi.getTopicsByForumId);
  });

  it('getTopicsByForumIdGenerator third yeald should return PUT action.type "GET_TOPICS_BY_FORUM_ID_SUCCESS"', () => {
    const testForumId = 1;
    const getTopicsByForumIdGenerator = topicSagas.getTopicsByForumIdNonBlock(testForumId);
    const forumsByChapterId = TopicApi.getTopicsByForumId(testForumId);

    getTopicsByForumIdGenerator.next();

    expect(getTopicsByForumIdGenerator.next(forumsByChapterId).value.PUT.action.type)
      .toEqual('GET_TOPICS_BY_FORUM_ID_SUCCESS');
  });

  it('getTopicsByForumIdGenerator third yeald should return PUT action.topics that is a Promise', () => {
    const testForumId = 1;
    const getTopicsByForumIdGenerator = topicSagas.getTopicsByForumIdNonBlock(testForumId);
    const forumsByChapterId = TopicApi.getTopicsByForumId(testForumId);

    getTopicsByForumIdGenerator.next();
    expect(CheckObject.IsPromise(getTopicsByForumIdGenerator.next(forumsByChapterId).value.PUT.action.topics))
      .toBeTruthy();
  });

  it('getTopicsByForumIdGenerator third yeald should return PUT action.forumId that is a Promise', () => {
    const testForumId = 1;
    const getTopicsByForumIdGenerator = topicSagas.getTopicsByForumIdNonBlock(testForumId);
    const forumsByChapterId = TopicApi.getTopicsByForumId(testForumId);

    getTopicsByForumIdGenerator.next();

    expect(getTopicsByForumIdGenerator.next(forumsByChapterId).value.PUT.action.forumId)
      .toEqual(testForumId);
  });
});
