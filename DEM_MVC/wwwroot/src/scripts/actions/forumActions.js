import * as types from "./actionTypes.js";

export function createForum(forum){
  return {type: types.CREATE_FORUM, forum};
}
