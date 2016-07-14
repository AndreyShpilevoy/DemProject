export default function forumReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_FORUM":
      return [...state, Object.assign({}, action.forum)];

    default:
      return state;
  }
}
