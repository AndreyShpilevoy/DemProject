import { call, put, take } from "redux-saga/effects";
import navigationLinkApi from "../api/mockNavigationLinkApi.js";
import * as navigationLinkActions from "../actions/navigationLinkActions";
import * as types from "../actions/actionTypes";

export function* getNavigationLinks() {
  while(true){
    yield take(types.GET_NAVIGATIONLINKS);
    const navigationLinks = yield call(navigationLinkApi.getNavigationLinks);
    yield put(navigationLinkActions.getNavigationLinksSuccess(navigationLinks));
  }
}