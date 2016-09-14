import * as types from "../actions/actionTypes";

export default function forumReducer(state = [], action) {
    switch (action.type) {
        case types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS:
            return [...state, {chapterId: action.chapterId, forumList: action.forums}];

        default:
            return state;
    }
}
