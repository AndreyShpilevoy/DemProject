/*eslint no-undef: 'off'*/

import * as types from 'enums/actionTypes';
import * as socialMediaLinkActions from 'actions/socialMediaLinkActions';
import socialMediaLinks from 'api/__fakeData__/socialMediaLinks';


describe('socialMediaLinkActions', () => {
  it('should create an action with type "GET_SOCIALMEDIALINKS" to get social Media Links', () => {
    const expectedAction = {type: types.GET_SOCIALMEDIALINKS};
    expect(socialMediaLinkActions.getSocialMediaLinks()).toEqual(expectedAction);
  });

  it('should create an action with type "GET_SOCIALMEDIALINKS_SUCCESS" to get social Media Links on success', () => {
    const expectedAction = {
      type: types.GET_SOCIALMEDIALINKS_SUCCESS,
      socialMediaLinks
    };
    expect(socialMediaLinkActions.getSocialMediaLinksSuccess(socialMediaLinks)).toEqual(expectedAction);
  });
});
