import * as types from "../actions/actionTypes.js";

export default function forumReducer(state = [], action) {
    switch (action.type) {
        case types.GET_ALL_FORUMS_SUCCESS:
            return action.forums;

        default:
            return state;
    }
}
