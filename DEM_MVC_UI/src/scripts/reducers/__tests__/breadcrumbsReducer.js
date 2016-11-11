/*eslint no-undef: "off"*/

import * as types from 'enums/actionTypes';
import breadcrumbsReducer from 'reducers/breadcrumbsReducer';
import * as fakeData from 'api/__fakeData__/index';

describe('breadcrumbsReducer', function(){
  it('should return empty array if Action Type wasnt handled and Store is empty', function(){
    let action = { type: 'unknown' };

    expect(breadcrumbsReducer(undefined, action)).toEqual([]);
  });

  it('should return "state" without changes if Action Type wasnt handled and "state" has predifined data', function(){
    let action = { type: 'unknown' };
    let state = {
      breadcrumbArray: [fakeData.breadcrumbs[0],fakeData.breadcrumbs[1]]
    };
    expect(breadcrumbsReducer(state, action)).toEqual(state);
  });

  it('should return "state" with "breadcrumbArray" array, that contain three expected elements. ActionType "GET_BREADCRUMBS_SUCCESS", "state" is empty', function(){
    let action = {
      type: types.GET_BREADCRUMBS_SUCCESS,
      breadcrumbArray: [fakeData.breadcrumbs[0], fakeData.breadcrumbs[1], fakeData.breadcrumbs[2]]
    };

    expect(breadcrumbsReducer(undefined, action)).toEqual({breadcrumbArray:  action.breadcrumbArray});
  });

  it('should return "state" with "breadcrumbArray" array, that contain two expected elements which replaced prefilled data. ActionType "GET_BREADCRUMBS_SUCCESS", "state" has prefilled data', function(){
    let action = {
      type: types.GET_BREADCRUMBS_SUCCESS,
      breadcrumbArray: [fakeData.breadcrumbs[0], fakeData.breadcrumbs[1]]
    };
    let state = {
      breadcrumbArray: [fakeData.breadcrumbs[2]]
    };

    expect(breadcrumbsReducer(state, action)).toEqual({breadcrumbArray: action.breadcrumbArray});
  });
});
