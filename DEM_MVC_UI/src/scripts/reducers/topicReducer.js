import * as types from "enums/actionTypes";

export default function topicReducer(state = [], action) {
    switch (action.type) {
        case types.GET_TOPICS_BY_FORUM_ID_SUCCESS:
          if(state.allTopics){
            return Object.assign({}, state, {
              allTopics: [
                ...state.allTopics,
                {forumId: action.forumId, topicArray: action.topics}
              ]
            });
          }
          return Object.assign({}, state, {
            allTopics: [
              {forumId: action.forumId, topicArray: action.topics}
            ]
          });

        default:
            return state;
    }
}
