import * as types from "../actions/actionTypes";

export default function forumReducer(state = [], action) {
    switch (action.type) {
        case types.GET_ALL_FORUMS_SUCCESS:
            return [...state, {chapterId: action.chapterId, forums: action.forums}];

        default:
            return state;
    }
}
