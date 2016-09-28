/*eslint no-undef: "off"*/

import * as socialMediaLinkSagas from "../socialMediaLinkSagas";
import SocialMediaLinkApi from "../../api/__mocks__/SocialMediaLinkApi";
import {CheckObject} from "../../../../testHelpers/_all";

describe('socialMediaLinkSagas', () => {
  it('getSocialMediaLinks first yeald should return TAKE pattern "GET_SOCIALMEDIALINKS"', () => {
    const socialMediaLinkSagaGenerator = socialMediaLinkSagas.getSocialMediaLinks();

    expect(socialMediaLinkSagaGenerator.next().value.TAKE.pattern)
      .toEqual('GET_SOCIALMEDIALINKS');
  });

  it('getSocialMediaLinks second yeald should return CALL to function "SocialMediaLinkApi.getSocialMediaLinks"', () => {
    const socialMediaLinkSagaGenerator = socialMediaLinkSagas.getSocialMediaLinks();

    socialMediaLinkSagaGenerator.next();

    expect(socialMediaLinkSagaGenerator.next().value.CALL.fn)
      .toEqual(SocialMediaLinkApi.getSocialMediaLinks);
  });

  it('getSocialMediaLinks third yeald should return PUT action.type "GET_SOCIALMEDIALINKS_SUCCESS"', () => {
    const socialMediaLinkSagaGenerator = socialMediaLinkSagas.getSocialMediaLinks();
    const socialMediaLinks = SocialMediaLinkApi.getSocialMediaLinks();

    socialMediaLinkSagaGenerator.next();
    socialMediaLinkSagaGenerator.next();

    expect(socialMediaLinkSagaGenerator.next(socialMediaLinks).value.PUT.action.type)
      .toEqual('GET_SOCIALMEDIALINKS_SUCCESS');
  });

  it('getSocialMediaLinks third yeald should return PUT action.socialMediaLinks that is a Promise', () => {
    const socialMediaLinkSagaGenerator = socialMediaLinkSagas.getSocialMediaLinks();
    const socialMediaLinks = SocialMediaLinkApi.getSocialMediaLinks();

    socialMediaLinkSagaGenerator.next();
    socialMediaLinkSagaGenerator.next();

    expect(CheckObject.IsPromise(socialMediaLinkSagaGenerator.next(socialMediaLinks).value.PUT.action.socialMediaLinks))
      .toBeTruthy();
  });
});
