/*eslint no-undef: "off"*/

import * as types from "../../actions/actionTypes";
import navigationLinkReducer from "../navigationLinkReducer";

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
      navigationLinks: [
        {id: 1, title: 'Conference', href: '/', order: 1},
        {id: 3, title: 'Link 3 autogen', href: '/', order: 3}
      ]
    };
    // execute
    let newState = navigationLinkReducer(undefined, action);
    // verify
    expect(newState).toEqual({navigationLinks:  action.navigationLinks});
  });
});
