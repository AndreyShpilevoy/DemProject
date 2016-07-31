import * as types from "./actionTypes";

export function getAllAuthors(){
  return {type: types.GET_ALL_AUTHORS};
}

export function getAllAuthorsSuccess(authors){
  return {type: types.GET_ALL_AUTHORS_SUCCESS, authors};
}
