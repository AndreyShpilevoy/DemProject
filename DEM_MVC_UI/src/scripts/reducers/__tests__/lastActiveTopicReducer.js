/*eslint no-undef: "off"*/

import * as types from "../../actions/actionTypes";
import lastActiveTopicReducer from "../lastActiveTopicReducer";
import * as fakeData from "../../api/__fakeData__/_all";

describe('lastActiveTopicReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = lastActiveTopicReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>lastActiveTopics</code> in given action GET_LAST_ACTIVE_TOPICS_SUCCESS', function(){
    // setup
    let action = {
      type: types.GET_LAST_ACTIVE_TOPICS_SUCCESS,
      lastActiveTopics: [fakeData.lastActiveTopics[2], fakeData.lastActiveTopics[0], fakeData.lastActiveTopics[1]]
    };
    // execute
    let newState = lastActiveTopicReducer(undefined, action);
    // verify
    expect(newState).toEqual({lastActiveTopics:  action.lastActiveTopics});
  });
});
