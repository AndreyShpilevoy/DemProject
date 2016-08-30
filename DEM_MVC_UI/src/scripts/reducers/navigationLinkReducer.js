import * as types from "../actions/actionTypes";

export default function navigationLinkReducer(state = [], action) {
    switch (action.type) {
        case types.GET_NAVIGATIONLINKS_SUCCESS:
            return action.navigationLinks;

        default:
            return state;
    }
}
