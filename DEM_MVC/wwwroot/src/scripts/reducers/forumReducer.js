import * as types from "../actions/actionTypes.js";

export default function forumReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_FORUM:
      return [...state, Object.assign({}, action.forum)];

    default:
      return state;
  }
}
