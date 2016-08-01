import * as types from "./actionTypes";

function getAllAuthors(){
  return {type: types.GET_ALL_AUTHORS};
}

function getAllAuthorsSuccess(authors){
  return {type: types.GET_ALL_AUTHORS_SUCCESS, authors};
}

export {
  getAllAuthors,
  getAllAuthorsSuccess
};
