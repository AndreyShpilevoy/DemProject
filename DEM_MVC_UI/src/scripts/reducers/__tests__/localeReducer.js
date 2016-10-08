/*eslint no-undef: "off"*/

import * as types from "../../actions/actionTypes";
import localeReducer from "../localeReducer";
import * as fakeData from "../../api/__fakeData__/_all";

describe('localeReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = localeReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>currentLocale</code> in given action GET_LOCALE_SUCCESS', function(){
    // setup
    let action = {
      type: types.GET_LOCALE_SUCCESS,
      currentLocale: fakeData.locale[0]
    };
    // execute
    let newState = localeReducer(undefined, action);
    // verify
    expect(newState).toEqual({currentLocale:  action.currentLocale});
  });
});
