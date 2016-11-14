/*eslint no-undef: 'off'*/

import * as socialMediaLinkSagas from 'sagas/socialMediaLinkSagas';
import SocialMediaLinkApi from 'api/__mocks__/SocialMediaLinkApi';
import CheckObject from 'testHelpers/CheckObject';

describe('socialMediaLinkSagas', () => {
  it('getSocialMediaLinks first yeald should return TAKE pattern "GET_SOCIALMEDIALINKS"', () => {
    const generator = socialMediaLinkSagas.getSocialMediaLinks();

    expect(generator.next().value.TAKE.pattern).toEqual('GET_SOCIALMEDIALINKS');
  });

  it('getSocialMediaLinks second yeald should return CALL to function "SocialMediaLinkApi.getSocialMediaLinks"', () => {
    const generator = socialMediaLinkSagas.getSocialMediaLinks();

    generator.next();
    expect(generator.next().value.CALL.fn).toEqual(SocialMediaLinkApi.getSocialMediaLinks);
  });

  it('getSocialMediaLinks third yeald should return PUT action.type "GET_SOCIALMEDIALINKS_SUCCESS"', () => {
    const generator = socialMediaLinkSagas.getSocialMediaLinks();
    const socialMediaLinks = SocialMediaLinkApi.getSocialMediaLinks();

    generator.next();
    generator.next();
    expect(generator.next(socialMediaLinks).value.PUT.action.type).toEqual('GET_SOCIALMEDIALINKS_SUCCESS');
  });

  it('getSocialMediaLinks third yeald should return PUT action.socialMediaLinks that is a Promise', () => {
    const generator = socialMediaLinkSagas.getSocialMediaLinks();
    const socialMediaLinks = SocialMediaLinkApi.getSocialMediaLinks();

    generator.next();
    generator.next();
    expect(CheckObject.IsPromise(generator.next(socialMediaLinks).value.PUT.action.socialMediaLinks)).toBeTruthy();
  });
});
