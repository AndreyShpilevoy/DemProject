import * as types from 'enums/actionTypes';

export default function navigationLinkReducer(state = [], action) {
  let localState = state;
    switch (action.type) {
      case types.GET_NAVIGATIONLINKS_SUCCESS:
        return Object.assign({}, state, {
          navigationLinks: action.navigationLinks
        });
    }
    return localState;
}
