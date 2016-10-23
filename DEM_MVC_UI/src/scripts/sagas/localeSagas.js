/* eslint import/prefer-default-export: "off" */

import { call, put, take } from "redux-saga/effects";
import LocaleApi from "api/__mocks__/LocaleApi";
import * as localeActions from "actions/localeActions";
import * as types from "actions/actionTypes";

export function* getLocale() {
  while(true){
    yield take(types.GET_LOCALE);
    const locale = yield call(LocaleApi.getLocale);
    yield put(localeActions.getLocaleSuccess(locale));
  }
}
