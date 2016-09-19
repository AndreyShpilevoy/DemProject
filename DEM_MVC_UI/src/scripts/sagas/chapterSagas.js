import { call, put, take } from "redux-saga/effects";
import chapterApi from "../api/mocks/mockChapterApi";
import * as authorActions from "../actions/chapterActions";
import * as types from "../actions/actionTypes";

export function* getAllChapters() {
  while(true){
    yield take(types.GET_ALL_CHAPTERS);
    const chapters = yield call(chapterApi.getAllChapters);
    yield put(authorActions.getAllChaptersSuccess(chapters));
  }
}
