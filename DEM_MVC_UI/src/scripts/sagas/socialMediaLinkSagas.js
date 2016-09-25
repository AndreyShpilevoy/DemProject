import { call, put, take } from "redux-saga/effects";
import socialMediaLinkApi from "../api/mocks/mockSocialMediaLinkApi";
import * as socialMediaLinkAction from "../actions/socialMediaLinkActions";
import * as types from "../actions/actionTypes";

export function* getSocialMediaLinks() {
  while(true){
    yield take(types.GET_SOCIALMEDIALINKS);
    const socialMediaLinks = yield call(socialMediaLinkApi.getSocialMediaLinks);
    yield put(socialMediaLinkAction.getSocialMediaLinksSuccess(socialMediaLinks));
  }
}
