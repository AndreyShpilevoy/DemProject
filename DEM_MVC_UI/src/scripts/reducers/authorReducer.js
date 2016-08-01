import * as types from "../actions/actionTypes";

export default function authorReducer(state = [], action) {
    switch (action.type) {
        case types.GET_ALL_AUTHORS_SUCCESS:
            return action.authors;

        default:
            return state;
    }
}
