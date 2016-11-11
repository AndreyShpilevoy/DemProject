import * as types from 'enums/actionTypes';

export default function breadcrumbsReducer(state = [], action) {
  let localState = state;
    switch (action.type) {
      case types.GET_BREADCRUMBS_SUCCESS:
        localState = Object.assign({}, localState, {
          breadcrumbArray: action.breadcrumbArray
        });
        break;
    }
    return localState;
}
