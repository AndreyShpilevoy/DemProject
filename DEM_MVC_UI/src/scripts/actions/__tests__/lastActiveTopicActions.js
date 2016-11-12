/*eslint no-undef: 'off'*/

import * as types from 'enums/actionTypes';
import * as lastActiveTopicActions from 'actions/lastActiveTopicActions';
import lastActiveTopics from 'api/__fakeData__/lastActiveTopics';


describe('lastActiveTopicActions', () => {
  it('should create an action with type "GET_LAST_ACTIVE_TOPICS" to get Last Active Topics', () => {
    const expectedAction = {type: types.GET_LAST_ACTIVE_TOPICS};
    expect(lastActiveTopicActions.getLastActiveTopics()).toEqual(expectedAction);
  });

  it('should create an action with type "GET_LAST_ACTIVE_TOPICS_SUCCESS" to get Last Active Topics on success', () => {
    const expectedAction = {
      type: types.GET_LAST_ACTIVE_TOPICS_SUCCESS,
      lastActiveTopics
    };
    expect(lastActiveTopicActions.getLastActiveTopicsSuccess(lastActiveTopics)).toEqual(expectedAction);
  });
});
