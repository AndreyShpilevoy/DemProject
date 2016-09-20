import { call, put, take } from "redux-saga/effects";
import localeApi from "../api/mocks/mockLocaleApi";
import * as localeActions from "../actions/localeActions";
import * as types from "../actions/actionTypes";

export function* getLocale() {
  while(true){
    yield take(types.GET_LOCALE);
    const locale = yield call(localeApi.getLocale);
    yield put(localeActions.getLocaleSuccess(locale));
  }
}
