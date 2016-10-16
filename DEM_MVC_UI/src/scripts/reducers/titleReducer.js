import * as types from "../actions/actionTypes";

export default function titleReducer(state = [], action) {
    switch (action.type) {
      case types.SET_TITLE_MAIN_PART:
        return Object.assign({}, state, {
          mainPart: action.mainPart
        });

      case types.SET_TITLE_ACTION_PART:
        return Object.assign({}, state, {
          actionPart: action.actionPart
        });

      case types.SET_TITLE_DESCRIPTION_PART:
        return Object.assign({}, state, {
          descriptionPart: action.descriptionPart
        });

      default:
        return state;
    }
}
