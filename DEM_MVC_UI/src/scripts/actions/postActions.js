import * as types from "./actionTypes";

function getPostsByTopicId(topicId){
  return {type: types.GET_POSTS_BY_TOPIC_ID, topicId};
}

function getPostsByTopicIdSuccess(topicId, posts){
  return {type: types.GET_POSTS_BY_TOPIC_ID_SUCCESS, topicId, posts};
}

export{
  getPostsByTopicId,
  getPostsByTopicIdSuccess
};
