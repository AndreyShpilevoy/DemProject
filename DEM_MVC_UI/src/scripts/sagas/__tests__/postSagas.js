/*eslint no-undef: 'off'*/

import * as postSagas from 'sagas/postSagas';
import PostApi from 'api/__mocks__/PostApi';
import CheckObject from 'testHelpers/CheckObject';


describe('postSagas', () => {
  it('getPostsByTopicId first yeald should return TAKE pattern "GET_POSTS_BY_TOPIC_ID"', () => {
    const generator = postSagas.getPostsByTopicId();

    expect(generator.next({}).value.TAKE.pattern).toEqual('GET_POSTS_BY_TOPIC_ID');
  });

  it('getPostsByTopicId second yeald should return FORK to function "getPostsByTopicIdNonBlock"', () => {
    const generator = postSagas.getPostsByTopicId();

    generator.next({});
    expect(generator.next({}).value.FORK.fn).toEqual(postSagas.getPostsByTopicIdNonBlock);
  });

  it('getPostsByTopicIdNonBlock second yeald should return CALL to function "PostApi.getPostsByTopicId"', () => {
    const testTopicId = 1;
    const generator = postSagas.getPostsByTopicIdNonBlock(testTopicId);

    expect(generator.next().value.CALL.fn).toEqual(PostApi.getPostsByTopicId);
  });

  it('getPostsByTopicIdNonBlock third yeald should return PUT action.type "GET_POSTS_BY_TOPIC_ID_SUCCESS"', () => {
    const testTopicId = 1;
    const generator = postSagas.getPostsByTopicIdNonBlock(testTopicId);
    const topicsByChapterId = PostApi.getPostsByTopicId(testTopicId);

    generator.next();
    expect(generator.next(topicsByChapterId).value.PUT.action.type).toEqual('GET_POSTS_BY_TOPIC_ID_SUCCESS');
  });

  it('getPostsByTopicIdNonBlock third yeald should return PUT action.posts that is a Promise', () => {
    const testTopicId = 1;
    const generator = postSagas.getPostsByTopicIdNonBlock(testTopicId);
    const topicsByChapterId = PostApi.getPostsByTopicId(testTopicId);

    generator.next();
    expect(CheckObject.IsPromise(generator.next(topicsByChapterId).value.PUT.action.posts)).toBeTruthy();
  });

  it('getPostsByTopicIdNonBlock third yeald should return PUT action.topicId that is a Promise', () => {
    const testTopicId = 1;
    const generator = postSagas.getPostsByTopicIdNonBlock(testTopicId);
    const topicsByChapterId = PostApi.getPostsByTopicId(testTopicId);

    generator.next();
    expect(generator.next(topicsByChapterId).value.PUT.action.topicId).toEqual(testTopicId);
  });
});
