/*eslint no-undef: "off"*/

import * as types from "../../actions/actionTypes";
import titleReducer from "../titleReducer";
import * as fakeData from "../../api/__fakeData__/index";

describe('titleReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = titleReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>mainPart</code> in given action SET_TITLE_MAIN_PART', function(){
    // setup
    let action = {
      type: types.SET_TITLE_MAIN_PART,
      mainPart: fakeData.title.mainPart
    };
    // execute
    let newState = titleReducer(undefined, action);
    // verify
    expect(newState).toEqual({mainPart:  action.mainPart});
  });

  it('returns the <code>actionPart</code> in given action SET_TITLE_ACTION_PART', function(){
    // setup
    let action = {
      type: types.SET_TITLE_ACTION_PART,
      actionPart: fakeData.title.actionPart
    };
    // execute
    let newState = titleReducer(undefined, action);
    // verify
    expect(newState).toEqual({actionPart:  action.actionPart});
  });

  it('returns the <code>descriptionPart</code> in given action SET_TITLE_DESCRIPTION_PART', function(){
    // setup
    let action = {
      type: types.SET_TITLE_DESCRIPTION_PART,
      descriptionPart: fakeData.title.descriptionPart
    };
    // execute
    let newState = titleReducer(undefined, action);
    // verify
    expect(newState).toEqual({descriptionPart:  action.descriptionPart});
  });
});
