/*eslint no-undef: "off"*/

import * as types from "actions/actionTypes";
import * as navigationLinkActions from "actions/navigationLinkActions";
import navigationLinks from "api/__fakeData__/navigationLinks";


describe('navigationLinkActions', () => {
  it('should create an action to get Navigation Links', () => {
    const expectedAction = {type: types.GET_NAVIGATIONLINKS};
    expect(navigationLinkActions.getNavigationLinks()).toEqual(expectedAction);
  });

  it('should create an action to get Navigation Links on success', () => {
    const expectedAction = {
      type: types.GET_NAVIGATIONLINKS_SUCCESS,
      navigationLinks
    };
    expect(navigationLinkActions.getNavigationLinksSuccess(navigationLinks)).toEqual(expectedAction);
  });
});
