import * as types from "../actions/actionTypes";

export default function chapterReducer(state = [], action) {
    switch (action.type) {
        case types.GET_ALL_CHAPTERS_SUCCESS:
            return Object.assign({}, state, {
              allChapters: action.chapters
            });

        default:
            return state;
    }
}
