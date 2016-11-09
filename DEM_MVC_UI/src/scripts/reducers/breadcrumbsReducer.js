import * as types from "enums/actionTypes";

export default function breadcrumbsReducer(state = [], action) {
  let localeState = state;
    switch (action.type) {
      case types.GET_BREADCRUMBS_SUCCESS:
      localeState = Object.assign({}, state, {
        breadcrumbArray: action.breadcrumbArray
      });
      break;
    }
    return localeState;
}
