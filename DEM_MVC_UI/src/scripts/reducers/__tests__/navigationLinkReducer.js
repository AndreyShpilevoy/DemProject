/*eslint no-undef: 'off'*/

import * as types from 'enums/actionTypes';
import navigationLinkReducer from 'reducers/navigationLinkReducer';
import * as fakeData from 'api/__fakeData__/index';

describe('navigationLinkReducer', function(){
  it('returns an empty array as default state', function(){
    let action = { type: 'unknown' };

    expect(navigationLinkReducer(undefined, action)).toEqual([]);
  });

  it('should return "state" without changes if Action Type wasnt handled and "state" has predifined data', function(){
    let action = { type: 'unknown' };
    let state = {
      navigationLinks: [fakeData.navigationLinks[2], fakeData.navigationLinks[0], fakeData.navigationLinks[1]]
    };
    expect(navigationLinkReducer(state, action)).toEqual(state);
  });

  it('should return "state" with "navigationLinks" array, that contain three expected elements. ActionType "GET_NAVIGATIONLINKS_SUCCESS", "state" is empty', function(){
    let action = {
      type: types.GET_NAVIGATIONLINKS_SUCCESS,
      navigationLinks: [fakeData.navigationLinks[2], fakeData.navigationLinks[0], fakeData.navigationLinks[1]]
    };

    expect(navigationLinkReducer(undefined, action)).toEqual({navigationLinks:  action.navigationLinks});
  });

  it('should return "state" with "navigationLinks" array, that contain three expected elements. ActionType "GET_NAVIGATIONLINKS_SUCCESS", "state" has prefilled data', function(){
    let action = {
      type: types.GET_NAVIGATIONLINKS_SUCCESS,
      navigationLinks: [fakeData.navigationLinks[2], fakeData.navigationLinks[1]]
    };
    let state = {
      navigationLinks: [fakeData.navigationLinks[0]]
    };

    expect(navigationLinkReducer(state, action)).toEqual({navigationLinks:  action.navigationLinks});
  });
});
