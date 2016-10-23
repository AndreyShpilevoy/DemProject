/*eslint no-undef: "off"*/

import * as navigationLinkSagas from "sagas/navigationLinkSagas";
import NavigationLinkApi from "api/__mocks__/NavigationLinkApi";
import CheckObject from "testHelpers/CheckObject";

describe('navigationLinkSagas', () => {
  it('getNavigationLinksGenerator first yeald should return TAKE pattern "GET_NAVIGATIONLINKS"', () => {
    const getNavigationLinksGenerator = navigationLinkSagas.getNavigationLinks();

    expect(getNavigationLinksGenerator.next().value.TAKE.pattern)
      .toEqual('GET_NAVIGATIONLINKS');
  });

  it('getNavigationLinksGenerator second yeald should return CALL to function "NavigationLinkApi.getNavigationLinks"', () => {
    const getNavigationLinksGenerator = navigationLinkSagas.getNavigationLinks();

    getNavigationLinksGenerator.next();

    expect(getNavigationLinksGenerator.next().value.CALL.fn)
      .toEqual(NavigationLinkApi.getNavigationLinks);
  });

  it('getNavigationLinksGenerator third yeald should return PUT action.type "GET_NAVIGATIONLINKS_SUCCESS"', () => {
    const getNavigationLinksGenerator = navigationLinkSagas.getNavigationLinks();
    const navigationLinks = NavigationLinkApi.getNavigationLinks();

    getNavigationLinksGenerator.next();
    getNavigationLinksGenerator.next();

    expect(getNavigationLinksGenerator.next(navigationLinks).value.PUT.action.type)
      .toEqual('GET_NAVIGATIONLINKS_SUCCESS');
  });

  it('getNavigationLinksGenerator third yeald should return PUT action.navigationLinks that is a Promise', () => {
    const getNavigationLinksGenerator = navigationLinkSagas.getNavigationLinks();
    const navigationLinks = NavigationLinkApi.getNavigationLinks();

    getNavigationLinksGenerator.next();
    getNavigationLinksGenerator.next();

    expect(CheckObject.IsPromise(getNavigationLinksGenerator.next(navigationLinks).value.PUT.action.navigationLinks))
      .toBeTruthy();
  });
});
