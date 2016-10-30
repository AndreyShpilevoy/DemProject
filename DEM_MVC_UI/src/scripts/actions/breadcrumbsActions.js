import * as types from "enums/actionTypes";

function getForumBreadcrumbs(forumId){
  return {type: types.GET_FORUM_BREADCRUMBS, forumId};
}

function getTopicBreadcrumbs(topicId){
  return {type: types.GET_TOPIC_BREADCRUMBS, topicId};
}

function getConferenceBreadcrumbs(){
  return getBreadcrumbsSuccess([{
      path: "/Conference",
      title: "Conference",
      level: 1
    }]);
}

function getBreadcrumbsSuccess(breadcrumbArray){
  return {
    type: types.GET_BREADCRUMBS_SUCCESS,
    breadcrumbArray
  };
}

export {
  getBreadcrumbsSuccess,
  getForumBreadcrumbs,
  getConferenceBreadcrumbs,
  getTopicBreadcrumbs
};
