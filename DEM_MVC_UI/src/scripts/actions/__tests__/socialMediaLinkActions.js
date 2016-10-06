/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as socialMediaLinkActions from "../socialMediaLinkActions";
import {socialMediaLinks} from "../../api/__fakeData__/_all";


describe('socialMediaLinkActions', () => {
  it('should create an action to get social Media Links', () => {
    const expectedAction = {type: types.GET_SOCIALMEDIALINKS};
    expect(socialMediaLinkActions.getSocialMediaLinks()).toEqual(expectedAction);
  });

  it('should create an action to get social Media Links on success', () => {
    const expectedAction = {
      type: types.GET_SOCIALMEDIALINKS_SUCCESS,
      socialMediaLinks
    };
    expect(socialMediaLinkActions.getSocialMediaLinksSuccess(socialMediaLinks)).toEqual(expectedAction);
  });
});
