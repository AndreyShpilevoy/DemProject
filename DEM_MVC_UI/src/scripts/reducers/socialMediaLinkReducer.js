import * as types from "../actions/actionTypes";

export default function socialMediaLinkReducer(state = [], action) {
    switch (action.type) {
        case types.GET_SOCIALMEDIALINKS_SUCCESS:
            return action.socialMediaLinks;

        default:
            return state;
    }
}
