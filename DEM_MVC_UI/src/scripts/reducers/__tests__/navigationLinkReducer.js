/*eslint no-undef: "off"*/

import * as types from "actions/actionTypes";
import navigationLinkReducer from "reducers/navigationLinkReducer";
import * as fakeData from "api/__fakeData__/index";

describe('navigationLinkReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = navigationLinkReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>navigationLinks</code> in given action GET_NAVIGATIONLINKS_SUCCESS', function(){
    // setup
    let action = {
      type: types.GET_NAVIGATIONLINKS_SUCCESS,
      navigationLinks: [fakeData.navigationLinks[2], fakeData.navigationLinks[0], fakeData.navigationLinks[1]]
    };
    // execute
    let newState = navigationLinkReducer(undefined, action);
    // verify
    expect(newState).toEqual({navigationLinks:  action.navigationLinks});
  });
});
