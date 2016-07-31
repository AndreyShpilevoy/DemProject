import * as types from "./actionTypes";

export function getAllForums(){
  return {type: types.GET_ALL_FORUMS};
}

export function getAllForumsSuccess(forums){
  return {type: types.GET_ALL_FORUMS_SUCCESS, forums};
}
