import * as types from "../actions/actionTypes";

export default function termTranslationReducer(state = [], action) {
    switch (action.type) {
        case types.GET_TERM_TRANSLATION_SUCCESS:
            return action.term;

        default:
            return state;
    }
}
