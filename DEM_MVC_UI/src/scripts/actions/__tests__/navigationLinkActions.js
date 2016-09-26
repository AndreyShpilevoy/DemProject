/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as navigationLinkActions from "../navigationLinkActions";


describe('navigationLinkActions', () => {
  it('should create an action to get Navigation Links', () => {
    const expectedAction = {type: types.GET_NAVIGATIONLINKS};
    expect(navigationLinkActions.getNavigationLinks()).toEqual(expectedAction);
  });

  it('should create an action to get Navigation Links on success', () => {
    const navigationLinks = [{id: 1, title: 'Conference', href: '/', order: 1},{id: 3, title: 'Link 3 autogen', href: '/', order: 3}];
    const expectedAction = {
      type: types.GET_NAVIGATIONLINKS_SUCCESS,
      navigationLinks
    };
    expect(navigationLinkActions.getNavigationLinksSuccess(navigationLinks)).toEqual(expectedAction);
  });
});
