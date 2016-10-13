/*eslint no-undef: "off"*/

import * as socialMediaLinkSagas from "../socialMediaLinkSagas";
import SocialMediaLinkApi from "../../api/__mocks__/SocialMediaLinkApi";
import CheckObject from "../../../../testHelpers/CheckObject";

describe('socialMediaLinkSagas', () => {
  it('getSocialMediaLinksGenerator first yeald should return TAKE pattern "GET_SOCIALMEDIALINKS"', () => {
    const getNavigationLinksGenerator = socialMediaLinkSagas.getSocialMediaLinks();

    expect(getNavigationLinksGenerator.next().value.TAKE.pattern)
      .toEqual('GET_SOCIALMEDIALINKS');
  });

  it('getSocialMediaLinksGenerator second yeald should return CALL to function "SocialMediaLinkApi.getSocialMediaLinks"', () => {
    const getNavigationLinksGenerator = socialMediaLinkSagas.getSocialMediaLinks();

    getNavigationLinksGenerator.next();

    expect(getNavigationLinksGenerator.next().value.CALL.fn)
      .toEqual(SocialMediaLinkApi.getSocialMediaLinks);
  });

  it('getSocialMediaLinksGenerator third yeald should return PUT action.type "GET_SOCIALMEDIALINKS_SUCCESS"', () => {
    const getNavigationLinksGenerator = socialMediaLinkSagas.getSocialMediaLinks();
    const socialMediaLinks = SocialMediaLinkApi.getSocialMediaLinks();

    getNavigationLinksGenerator.next();
    getNavigationLinksGenerator.next();

    expect(getNavigationLinksGenerator.next(socialMediaLinks).value.PUT.action.type)
      .toEqual('GET_SOCIALMEDIALINKS_SUCCESS');
  });

  it('getSocialMediaLinksGenerator third yeald should return PUT action.socialMediaLinks that is a Promise', () => {
    const getNavigationLinksGenerator = socialMediaLinkSagas.getSocialMediaLinks();
    const socialMediaLinks = SocialMediaLinkApi.getSocialMediaLinks();

    getNavigationLinksGenerator.next();
    getNavigationLinksGenerator.next();

    expect(CheckObject.IsPromise(getNavigationLinksGenerator.next(socialMediaLinks).value.PUT.action.socialMediaLinks))
      .toBeTruthy();
  });
});
