import { call, put, take, fork } from "redux-saga/effects";
import forumApi from "../api/mockForumApi";
import * as forumActions from "../actions/forumActions";
import * as types from "../actions/actionTypes";

export function* getForumsByChapterId() {
  while(true){
    const { chapterId } = yield take(types.GET_FORUMS_BY_CHAPTER_ID);
    yield fork(getForumsByChapterIdNonBlock, chapterId);
  }
}

function* getForumsByChapterIdNonBlock(chapterId) {
  const forums = yield call(forumApi.getForumsByChapterId, chapterId);
  yield put(forumActions.getForumsByChapterIdSuccess(chapterId, forums));
}
