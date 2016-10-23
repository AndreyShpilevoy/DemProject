/* eslint import/prefer-default-export: "off" */

import { call, put, take } from "redux-saga/effects";
import SocialMediaLinkApi from "api/__mocks__/SocialMediaLinkApi";
import * as socialMediaLinkAction from "actions/socialMediaLinkActions";
import * as types from "actions/actionTypes";

export function* getSocialMediaLinks() {
  while(true){
    yield take(types.GET_SOCIALMEDIALINKS);
    const socialMediaLinks = yield call(SocialMediaLinkApi.getSocialMediaLinks);
    yield put(socialMediaLinkAction.getSocialMediaLinksSuccess(socialMediaLinks));
  }
}
