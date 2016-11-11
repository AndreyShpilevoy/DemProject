import * as types from 'enums/actionTypes';

export default function navigationLinkReducer(state = [], action) {
  let localState = state;
    switch (action.type) {
      case types.GET_NAVIGATIONLINKS_SUCCESS:
        localState = Object.assign({}, localState, {
          navigationLinks: action.navigationLinks
        });
        break;
    }
    return localState;
}
