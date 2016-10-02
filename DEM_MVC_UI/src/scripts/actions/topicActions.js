import * as types from "./actionTypes";

function getTopicsByForumId(forumId){
  return {type: types.GET_TOPICS_BY_FORUM_ID, forumId};
}

function getTopicsByForumIdSuccess(forumId, topics){
  return {type: types.GET_TOPICS_BY_FORUM_ID_SUCCESS, forumId, topics};
}

export{
  getTopicsByForumId,
  getTopicsByForumIdSuccess
};
