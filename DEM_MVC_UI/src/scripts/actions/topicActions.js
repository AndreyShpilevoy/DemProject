import * as types from "./actionTypes";

function getLastActiveTopics(){
  return {type: types.GET_LAST_ACTIVE_TOPICS};
}

function getLastActiveTopicsSuccess(lastActiveTopics){
  return {type: types.GET_LAST_ACTIVE_TOPICS_SUCCESS, lastActiveTopics};
}

function getTopicsByForumId(forumId){
  return {type: types.GET_TOPICS_BY_FORUM_ID, forumId};
}

function getTopicsByForumIdSuccess(forumId, topics){
  return {type: types.GET_TOPICS_BY_FORUM_ID_SUCCESS, forumId, topics};
}

export{
  getLastActiveTopics,
  getLastActiveTopicsSuccess,
  getTopicsByForumId,
  getTopicsByForumIdSuccess
};
