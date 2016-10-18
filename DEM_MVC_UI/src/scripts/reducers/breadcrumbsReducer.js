import * as types from "../actions/actionTypes";

export default function breadcrumbsReducer(state = [], action) {
    switch (action.type) {
        case types.GET_BREADCRUMBS_SUCCESS:
        return Object.assign({}, state, {
          breadcrumbs: action.breadcrumbs
        });

        default:
            return state;
    }
}
