/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as breadcrumbsActions from "../breadcrumbsActions";
import breadcrumbs from "../../api/__fakeData__/breadcrumbs";


describe('breadcrumbsActions', () => {
  it('should create an action with type "GET_FORUM_BREADCRUMBS" and forumId', () => {
    const forumId = 1;
    const expectedAction = {
      type: types.GET_FORUM_BREADCRUMBS,
      forumId
    };
    expect(breadcrumbsActions.getForumBreadcrumbs(forumId)).toEqual(expectedAction);
  });

  it('should create an action with type "GET_TOPIC_BREADCRUMBS" and topicId', () => {
    const topicId = 1;
    const expectedAction = {
      type: types.GET_TOPIC_BREADCRUMBS,
      topicId
    };
    expect(breadcrumbsActions.getTopicBreadcrumbs(topicId)).toEqual(expectedAction);
  });

  it('should create an action with type "GET_BREADCRUMBS_SUCCESS" and expected model', () => {
    const expectedAction = {
      type: types.GET_BREADCRUMBS_SUCCESS,
      breadcrumbs
    };
    expect(breadcrumbsActions.getBreadcrumbsSuccess(breadcrumbs)).toEqual(expectedAction);
  });
});
