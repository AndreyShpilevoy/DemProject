/*eslint no-undef: "off"*/

import * as types from "actions/actionTypes";
import socialMediaLinkReducer from "reducers/socialMediaLinkReducer";
import * as fakeData from "api/__fakeData__/index";

describe('socialMediaLinkReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = socialMediaLinkReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>socialMediaLinks</code> in given action GET_SOCIALMEDIALINKS_SUCCESS', function(){
    // setup
    let action = {
      type: types.GET_SOCIALMEDIALINKS_SUCCESS,
      socialMediaLinks: [fakeData.socialMediaLinks[1], fakeData.socialMediaLinks[0]]
    };
    // execute
    let newState = socialMediaLinkReducer(undefined, action);
    // verify
    expect(newState).toEqual({socialMediaLinks:  action.socialMediaLinks});
  });
});
