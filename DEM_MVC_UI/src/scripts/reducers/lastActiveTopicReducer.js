import * as types from 'enums/actionTypes';

export default function lastActiveTopicReducer(state = [], action) {
  let localState = state;
    switch (action.type) {
      case types.GET_LAST_ACTIVE_TOPICS_SUCCESS:
        localState = Object.assign({}, state, {
          lastActiveTopics: action.lastActiveTopics
        });
    }
    return localState;
}
