/*eslint no-undef: "off"*/

import { call, put, take } from "redux-saga/effects";
import * as navigationLinkSagas from "../navigationLinkSagas";
import NavigationLinkApi from "../../api/__mocks__/NavigationLinkApi";
import * as navigationLinkActions from "../../actions/navigationLinkActions";

describe('navigationLinkSagas', () => {
  it('getNavigationLinks generator should pass on three steps', () => {
    const navigationLinkSagasGenerator = navigationLinkSagas.getNavigationLinks();
    const action = {
      type: "GET_NAVIGATIONLINKS"
    };
    const navigationLinks = NavigationLinkApi.getNavigationLinks();

    expect(navigationLinkSagasGenerator.next(action).value)
      .toEqual(take(action.type));

    expect(navigationLinkSagasGenerator.next().value)
      .toEqual(call(NavigationLinkApi.getNavigationLinks));

    expect(navigationLinkSagasGenerator.next(navigationLinks).value)
      .toEqual(put(navigationLinkActions.getNavigationLinksSuccess(navigationLinks)));
  });
});
