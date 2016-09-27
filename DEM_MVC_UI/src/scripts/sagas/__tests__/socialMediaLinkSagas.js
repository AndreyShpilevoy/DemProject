/*eslint no-undef: "off"*/

import { call, put, take } from "redux-saga/effects";
import * as types from "../../actions/actionTypes";
import * as socialMediaLinkSagas from "../socialMediaLinkSagas";
import socialMediaLinkApi from "../../api/mocks/mockSocialMediaLinkApi";
import * as socialMediaLinkAction from "../../actions/socialMediaLinkActions";

describe('socialMediaLinkSagas', () => {
  it('saga called with wrong type and shoud return underfined object in last call', () => {
    const socialMediaLinkSagaGenerator = socialMediaLinkSagas.getSocialMediaLinks();
    const action = {
      type: types.GET_SOCIALMEDIALINKS
    };

    expect(socialMediaLinkSagaGenerator.next(action).value).toEqual(take(action.type));
    expect(socialMediaLinkSagaGenerator.next().value).toEqual(call(socialMediaLinkApi.getSocialMediaLinks));
    let socialMediaLinks = socialMediaLinkApi.getSocialMediaLinks();
    expect(socialMediaLinkSagaGenerator.next(socialMediaLinks).value).toEqual(put(socialMediaLinkAction.getSocialMediaLinksSuccess(socialMediaLinks)));
  });
});
