import { call, put } from "redux-saga/effects";
import forumApi from "../api/mockForumApi";
import * as forumActions from "../actions/forumActions";

export function* getAllForums() {
  const forums = yield call(forumApi.getAllForums);
  yield put(forumActions.getAllForumsSuccess(forums));
}

export function* test() {
}
