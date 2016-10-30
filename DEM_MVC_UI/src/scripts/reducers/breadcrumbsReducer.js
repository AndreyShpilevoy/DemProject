import * as types from "enums/actionTypes";

export default function breadcrumbsReducer(state = [], action) {
    switch (action.type) {
        case types.GET_BREADCRUMBS_SUCCESS:
        return Object.assign({}, state, {
          breadcrumbArray: action.breadcrumbArray
        });

        default:
            return state;
    }
}
