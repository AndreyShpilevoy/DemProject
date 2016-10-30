import * as types from "enums/actionTypes";

export default function localeReducer(state = [], action) {
    switch (action.type) {
        case types.GET_LOCALE_SUCCESS:
        return Object.assign({}, state, {
          currentLocale: action.currentLocale
        });

        default:
            return state;
    }
}
