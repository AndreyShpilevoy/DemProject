/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as lastActiveTopicActions from "../lastActiveTopicActions";
import {lastActiveTopics} from "../../api/__fakeData__/_all";


describe('lastActiveTopicActions', () => {
  it('should create an action to get Navigation Links', () => {
    const expectedAction = {type: types.GET_LAST_ACTIVE_TOPICS};
    expect(lastActiveTopicActions.getLastActiveTopics()).toEqual(expectedAction);
  });

  it('should create an action to get Navigation Links on success', () => {
    const expectedAction = {
      type: types.GET_LAST_ACTIVE_TOPICS_SUCCESS,
      lastActiveTopics
    };
    expect(lastActiveTopicActions.getLastActiveTopicsSuccess(lastActiveTopics)).toEqual(expectedAction);
  });
});
