import * as types from "../actions/actionTypes";

export default function topicReducer(state = [], action) {
    switch (action.type) {
        case types.GET_TOPICS_BY_FORUM_ID_SUCCESS:
          if(state.allTopics){
            return Object.assign({}, state, {
              allTopics: [
                ...state.allTopics,
                {forumId: action.forumId, topicList: action.topics}
              ]
            });
          }
          return Object.assign({}, state, {
            allTopics: [
              {forumId: action.forumId, topicList: action.topics}
            ]
          });

        default:
            return state;
    }
}
