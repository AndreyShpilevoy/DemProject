/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as topicActions from "../topicActions";
import {topics} from "../../api/__fakeData__/_all";


describe('topicActions', () => {
  it('should create an action to get topic by forum id', () => {
    const forumId = 1;
    const expectedAction = {
      type: types.GET_TOPICS_BY_FORUM_ID,
      forumId
    };
    expect(topicActions.getTopicsByForumId(forumId)).toEqual(expectedAction);
  });

  it('should create an action to get topic by forum id on success', () => {
    const forumId = 1;
    const expectedAction = {
      type: types.GET_TOPICS_BY_FORUM_ID_SUCCESS,
      forumId,
      topics
    };
    expect(topicActions.getTopicsByForumIdSuccess(forumId, topics)).toEqual(expectedAction);
  });
});
