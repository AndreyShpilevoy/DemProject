import * as types from 'enums/actionTypes';

export default function socialMediaLinkReducer(state = [], action) {
  let localState = state;
    switch (action.type) {
      case types.GET_SOCIALMEDIALINKS_SUCCESS:
        localState = Object.assign({}, state, {
          socialMediaLinks:  action.socialMediaLinks
        });
        break;
    }
  return localState;
}
