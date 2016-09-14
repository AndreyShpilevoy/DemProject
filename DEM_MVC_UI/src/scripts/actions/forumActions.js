import * as types from "./actionTypes";

function getForumsByChapterId(chapterId){
  return {type: types.GET_FORUMS_BY_CHAPTER_ID, chapterId};
}

function getForumsByChapterIdSuccess(chapterId, forums){
  return {type: types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS, chapterId, forums};
}

export{
  getForumsByChapterId,
  getForumsByChapterIdSuccess
};
