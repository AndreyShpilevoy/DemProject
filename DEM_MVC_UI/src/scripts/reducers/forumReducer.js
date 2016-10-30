import * as types from "enums/actionTypes";

export default function forumReducer(state = [], action) {
    switch (action.type) {
        case types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS:
          if(state.allForums){
            return Object.assign({}, state, {
              allForums: [
                ...state.allForums,
                {chapterId: action.chapterId, forumArray: action.forums}
              ]
            });
          }
          return Object.assign({}, state, {
            allForums: [
              {chapterId: action.chapterId, forumArray: action.forums}
            ]
          });

        default:
            return state;
    }
}
