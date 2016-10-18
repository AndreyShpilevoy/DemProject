/*eslint no-undef: "off"*/

import * as types from "../../actions/actionTypes";
import breadcrumbsReducer from "../breadcrumbsReducer";
import * as fakeData from "../../api/__fakeData__/index";

describe('breadcrumbsReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = breadcrumbsReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>breadcrumbs</code> in given action GET_BREADCRUMBS_SUCCESS', function(){
    // setup
    let action = {
      type: types.GET_BREADCRUMBS_SUCCESS,
      breadcrumbs: [fakeData.breadcrumbs[0], fakeData.breadcrumbs[1], fakeData.breadcrumbs[2]]
    };
    // execute
    let newState = breadcrumbsReducer(undefined, action);
    // verify
    expect(newState).toEqual({breadcrumbs:  action.breadcrumbs});
  });
});
