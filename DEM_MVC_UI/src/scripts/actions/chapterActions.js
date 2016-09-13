import * as types from "./actionTypes";

function getAllChapters(){
  return {type: types.GET_ALL_CHAPTERS};
}

function getAllChaptersSuccess(chapters){
  return {type: types.GET_ALL_CHAPTERS_SUCCESS, chapters};
}

export {
  getAllChapters,
  getAllChaptersSuccess
};
