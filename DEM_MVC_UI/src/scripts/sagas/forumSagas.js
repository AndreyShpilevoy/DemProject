import { call, put, take, fork } from "redux-saga/effects";
import forumApi from "../api/mockForumApi";
import * as forumActions from "../actions/forumActions";
import * as types from "../actions/actionTypes";

export function* getAllForums() {
  while(true){
    const { chapterId } = yield take(types.GET_ALL_FORUMS);
    yield fork(getForumsByChapterId, chapterId);
  }
}

function* getForumsByChapterId(chapterId) {
  const forums = yield call(forumApi.getAllForums, chapterId);
  yield put(forumActions.getAllForumsSuccess(chapterId, forums));
}
