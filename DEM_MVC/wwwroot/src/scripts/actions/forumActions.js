import * as types from "./actionTypes";

function getAllForums(){
  return {type: types.GET_ALL_FORUMS};
}

function getAllForumsSuccess(forums){
  return {type: types.GET_ALL_FORUMS_SUCCESS, forums};
}

export{
  getAllForums,
  getAllForumsSuccess
};
