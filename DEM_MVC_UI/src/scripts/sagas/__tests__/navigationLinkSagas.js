/*eslint no-undef: "off"*/

import * as navigationLinkSagas from "sagas/navigationLinkSagas";
import NavigationLinkApi from "api/__mocks__/NavigationLinkApi";
import CheckObject from "testHelpers/CheckObject";

describe('navigationLinkSagas', () => {
  it('getNavigationLinks first yeald should return TAKE pattern "GET_NAVIGATIONLINKS"', () => {
    const generator = navigationLinkSagas.getNavigationLinks();

    expect(generator.next().value.TAKE.pattern).toEqual('GET_NAVIGATIONLINKS');
  });

  it('getNavigationLinks second yeald should return CALL to function "NavigationLinkApi.getNavigationLinks"', () => {
    const generator = navigationLinkSagas.getNavigationLinks();

    generator.next();
    expect(generator.next().value.CALL.fn).toEqual(NavigationLinkApi.getNavigationLinks);
  });

  it('getNavigationLinks third yeald should return PUT action.type "GET_NAVIGATIONLINKS_SUCCESS"', () => {
    const generator = navigationLinkSagas.getNavigationLinks();
    const navigationLinks = NavigationLinkApi.getNavigationLinks();

    generator.next();
    generator.next();
    expect(generator.next(navigationLinks).value.PUT.action.type).toEqual('GET_NAVIGATIONLINKS_SUCCESS');
  });

  it('getNavigationLinks third yeald should return PUT action.navigationLinks that is a Promise', () => {
    const generator = navigationLinkSagas.getNavigationLinks();
    const navigationLinks = NavigationLinkApi.getNavigationLinks();

    generator.next();
    generator.next();
    expect(CheckObject.IsPromise(generator.next(navigationLinks).value.PUT.action.navigationLinks)).toBeTruthy();
  });
});
