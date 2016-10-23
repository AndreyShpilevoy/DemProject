/*eslint no-undef: "off"*/

import * as types from "actions/actionTypes";
import * as postActions from "actions/postActions";
import posts from "api/__fakeData__/posts";


describe('postActions', () => {
  it('should create an action to get post by topic id', () => {
    const topicId = 1;
    const expectedAction = {
      type: types.GET_POSTS_BY_TOPIC_ID,
      topicId
    };
    expect(postActions.getPostsByTopicId(topicId)).toEqual(expectedAction);
  });

  it('should create an action to get post by topic id on success', () => {
    const topicId = 1;
    const expectedAction = {
      type: types.GET_POSTS_BY_TOPIC_ID_SUCCESS,
      topicId,
      posts
    };
    expect(postActions.getPostsByTopicIdSuccess(topicId, posts)).toEqual(expectedAction);
  });
});
