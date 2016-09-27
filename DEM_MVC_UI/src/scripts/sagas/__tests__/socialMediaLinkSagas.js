/*eslint no-undef: "off"*/

import { call, put, take } from "redux-saga/effects";
import * as socialMediaLinkSagas from "../socialMediaLinkSagas";
import SocialMediaLinkApi from "../../api/__mocks__/SocialMediaLinkApi";
import * as socialMediaLinkAction from "../../actions/socialMediaLinkActions";

describe('socialMediaLinkSagas', () => {
  it('getSocialMediaLinks generator should pass on three steps', () => {
    const socialMediaLinkSagaGenerator = socialMediaLinkSagas.getSocialMediaLinks();
    const action = {
      type: "GET_SOCIALMEDIALINKS"
    };
    const socialMediaLinks = SocialMediaLinkApi.getSocialMediaLinks();

    expect(socialMediaLinkSagaGenerator.next(action).value)
      .toEqual(take(action.type));

    expect(socialMediaLinkSagaGenerator.next().value)
      .toEqual(call(SocialMediaLinkApi.getSocialMediaLinks));

    expect(socialMediaLinkSagaGenerator.next(socialMediaLinks).value)
      .toEqual(put(socialMediaLinkAction.getSocialMediaLinksSuccess(socialMediaLinks)));
  });
});
