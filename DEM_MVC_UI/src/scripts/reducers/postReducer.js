import * as types from 'enums/actionTypes';

export default function postReducer(state = [], action) {
    switch (action.type) {
        case types.GET_POSTS_BY_TOPIC_ID_SUCCESS:
          if(state.allPosts){
            return Object.assign({}, state, {
              allPosts: [
                ...state.allPosts,
                {topicId: action.topicId, postArray: action.posts}
              ]
            });
          }
          return Object.assign({}, state, {
            allPosts: [
              {topicId: action.topicId, postArray: action.posts}
            ]
          });

        default:
            return state;
    }
}
