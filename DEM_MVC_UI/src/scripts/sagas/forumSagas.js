import { call, put, take } from "redux-saga/effects";
import forumApi from "../api/mockForumApi";
import * as forumActions from "../actions/forumActions";
import * as types from "../actions/actionTypes";

export function* getAllForums() {
  while(true){
    yield take(types.GET_ALL_FORUMS);
    const forums = yield call(forumApi.getAllForums);
    yield put(forumActions.getAllForumsSuccess(forums));
  }
}
