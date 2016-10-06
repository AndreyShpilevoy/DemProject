import * as types from "../actions/actionTypes";

export default function lastActiveTopicReducer(state = [], action) {
    switch (action.type) {
        case types.GET_LAST_ACTIVE_TOPICS_SUCCESS:
          return Object.assign({}, state, {
            lastActiveTopics: action.lastActiveTopics
          });

        default:
            return state;
    }
}
