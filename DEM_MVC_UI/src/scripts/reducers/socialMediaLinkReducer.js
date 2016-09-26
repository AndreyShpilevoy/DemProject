import * as types from "../actions/actionTypes";

export default function socialMediaLinkReducer(state = [], action) {
    switch (action.type) {
        case types.GET_SOCIALMEDIALINKS_SUCCESS:
          return Object.assign({}, state, {
            socialMediaLinks:  action.socialMediaLinks
          });

        default:
            return state;
    }
}
