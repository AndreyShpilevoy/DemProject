import * as types from "./actionTypes";

export function createForum(forum){
  return {type: types.CREATE_FORUM, forum};
}

export function getAllForumsSuccess(forums){
  return {type: types.GET_ALL_FORUMS_SUCCESS, forums};
}
