import * as types from "../actions/actionTypes";

export default function forumReducer(state = [], action) {
    switch (action.type) {
        case types.GET_ALL_FORUMS_SUCCESS:
            return action.forums;

        default:
            return state;
    }
}
