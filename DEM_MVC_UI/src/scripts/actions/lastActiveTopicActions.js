import * as types from "enums/actionTypes";

function getLastActiveTopics(){
  return {type: types.GET_LAST_ACTIVE_TOPICS};
}

function getLastActiveTopicsSuccess(lastActiveTopics){
  return {type: types.GET_LAST_ACTIVE_TOPICS_SUCCESS, lastActiveTopics};
}

export{
  getLastActiveTopics,
  getLastActiveTopicsSuccess
};
