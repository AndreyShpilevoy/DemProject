import * as types from 'enums/actionTypes';

function getAllChapters(){
  return {type: types.GET_ALL_CHAPTERS};
}

function getAllChaptersSuccess(allChapters){
  return {type: types.GET_ALL_CHAPTERS_SUCCESS, allChapters};
}

function getChapterById(chapterId){
  if(chapterId){
    return {type: types.GET_CHAPTER_BY_ID, chapterId};
  }
}

function getChapterByIdSuccess(chapterById){
  return {type: types.GET_CHAPTER_BY_ID_SUCCESS, chapterById};
}

export {
  getAllChapters,
  getAllChaptersSuccess,
  getChapterById,
  getChapterByIdSuccess
};
