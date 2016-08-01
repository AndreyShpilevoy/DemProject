import { call, put, take } from "redux-saga/effects";
import authorApi from "../api/mockAuthorApi";
import * as authorActions from "../actions/authorActions";
import * as types from "../actions/actionTypes";

export function* getAllAuthors() {
  while(true){
    yield take(types.GET_ALL_AUTHORS);
    const authors = yield call(authorApi.getAllAuthors);
    yield put(authorActions.getAllAuthorsSuccess(authors));
  }
}
