/*eslint no-undef: "off"*/

import * as types from 'enums/actionTypes';
import * as breadcrumbsActions from 'actions/breadcrumbsActions';
import breadcrumbs from 'api/__fakeData__/breadcrumbs';


describe('breadcrumbsActions', () => {
  it('"getForumBreadcrumbs" should create an action with type "GET_FORUM_BREADCRUMBS" and forumId', () => {
    const forumId = 1;
    const expectedAction = {
      type: types.GET_FORUM_BREADCRUMBS,
      forumId
    };
    expect(breadcrumbsActions.getForumBreadcrumbs(forumId)).toEqual(expectedAction);
  });

  it('"getTopicBreadcrumbs" should create an action with type "GET_TOPIC_BREADCRUMBS" and topicId', () => {
    const topicId = 1;
    const expectedAction = {
      type: types.GET_TOPIC_BREADCRUMBS,
      topicId
    };
    expect(breadcrumbsActions.getTopicBreadcrumbs(topicId)).toEqual(expectedAction);
  });

  it('"getConferenceBreadcrumbs" should create an action with type "GET_BREADCRUMBS_SUCCESS" and expected model', () => {
    const expectedAction = {
      type: types.GET_BREADCRUMBS_SUCCESS,
      breadcrumbArray: [breadcrumbs[0]]
    };
    expect(breadcrumbsActions.getConferenceBreadcrumbs()).toEqual(expectedAction);
  });

  it('"getBreadcrumbsSuccess" should create an action with type "GET_BREADCRUMBS_SUCCESS" and expected model', () => {
    const expectedAction = {
      type: types.GET_BREADCRUMBS_SUCCESS,
      breadcrumbArray: breadcrumbs
    };
    expect(breadcrumbsActions.getBreadcrumbsSuccess(breadcrumbs)).toEqual(expectedAction);
  });
});
