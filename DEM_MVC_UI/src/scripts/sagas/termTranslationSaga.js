import { call, put, take, fork } from "redux-saga/effects";
import termTranslationApi from "../api/termTranslationApi.js";
import * as termTranslationActions from "../actions/termTranslationActions";
import * as types from "../actions/actionTypes";

export function* getTermTranslation() {
  while(true){
    const { term } = yield take(types.GET_TERM_TRANSLATION);
    yield fork(getTermTranslationNonBlock, term);
  }
}

function* getTermTranslationNonBlock(term) {
  const translaedTerm = termTranslationApi.getTermTranslation(term, "en");
  yield put(termTranslationActions.getTermTranslationSuccess(translaedTerm));
}
