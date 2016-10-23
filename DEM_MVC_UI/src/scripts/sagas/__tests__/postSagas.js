/*eslint no-undef: "off"*/

import * as postSagas from "sagas/postSagas";
import PostApi from "api/__mocks__/PostApi";
import CheckObject from "testHelpers/CheckObject";


describe('postSagas', () => {
  it('getPostsByTopicIdGenerator first yeald should return TAKE pattern "GET_POSTS_BY_TOPIC_ID"', () => {
    const getPostsByTopicIdGenerator = postSagas.getPostsByTopicId();

    expect(getPostsByTopicIdGenerator.next({}).value.TAKE.pattern)
      .toEqual('GET_POSTS_BY_TOPIC_ID');
  });

  it('getPostsByTopicIdGenerator second yeald should return FORK to function "getPostsByTopicIdNonBlock"', () => {
    const getPostsByTopicIdGenerator = postSagas.getPostsByTopicId();

    getPostsByTopicIdGenerator.next({});
    expect(getPostsByTopicIdGenerator.next({}).value.FORK.fn)
      .toEqual(postSagas.getPostsByTopicIdNonBlock);
  });

  it('getPostsByTopicIdGenerator second yeald should return CALL to function "PostApi.getPostsByTopicId"', () => {
    const testTopicId = 1;
    const getPostsByTopicIdGenerator = postSagas.getPostsByTopicIdNonBlock(testTopicId);

    expect(getPostsByTopicIdGenerator.next().value.CALL.fn)
      .toEqual(PostApi.getPostsByTopicId);
  });

  it('getPostsByTopicIdGenerator third yeald should return PUT action.type "GET_POSTS_BY_TOPIC_ID_SUCCESS"', () => {
    const testTopicId = 1;
    const getPostsByTopicIdGenerator = postSagas.getPostsByTopicIdNonBlock(testTopicId);
    const topicsByChapterId = PostApi.getPostsByTopicId(testTopicId);

    getPostsByTopicIdGenerator.next();

    expect(getPostsByTopicIdGenerator.next(topicsByChapterId).value.PUT.action.type)
      .toEqual('GET_POSTS_BY_TOPIC_ID_SUCCESS');
  });

  it('getPostsByTopicIdGenerator third yeald should return PUT action.posts that is a Promise', () => {
    const testTopicId = 1;
    const getPostsByTopicIdGenerator = postSagas.getPostsByTopicIdNonBlock(testTopicId);
    const topicsByChapterId = PostApi.getPostsByTopicId(testTopicId);

    getPostsByTopicIdGenerator.next();
    expect(CheckObject.IsPromise(getPostsByTopicIdGenerator.next(topicsByChapterId).value.PUT.action.posts))
      .toBeTruthy();
  });

  it('getPostsByTopicIdGenerator third yeald should return PUT action.topicId that is a Promise', () => {
    const testTopicId = 1;
    const getPostsByTopicIdGenerator = postSagas.getPostsByTopicIdNonBlock(testTopicId);
    const topicsByChapterId = PostApi.getPostsByTopicId(testTopicId);

    getPostsByTopicIdGenerator.next();

    expect(getPostsByTopicIdGenerator.next(topicsByChapterId).value.PUT.action.topicId)
      .toEqual(testTopicId);
  });
});
