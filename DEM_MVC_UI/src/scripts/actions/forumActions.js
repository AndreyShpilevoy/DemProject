import * as types from "./actionTypes";

function getAllForums(chapterId){
  return {type: types.GET_ALL_FORUMS, chapterId};
}

function getAllForumsSuccess(chapterId, forums){
  return {type: types.GET_ALL_FORUMS_SUCCESS, chapterId, forums};
}

export{
  getAllForums,
  getAllForumsSuccess
};
