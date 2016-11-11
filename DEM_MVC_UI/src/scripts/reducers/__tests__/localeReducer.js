/*eslint no-undef: 'off'*/

import * as types from 'enums/actionTypes';
import localeReducer from 'reducers/localeReducer';
import * as fakeData from 'api/__fakeData__/index';

describe('localeReducer', function(){
  it('returns an empty array as default state', function(){
    let action = { type: 'unknown' };

    expect(localeReducer(undefined, action)).toEqual([]);
  });

  it('should return "state" without changes if Action Type wasnt handled and "state" has predifined data', function(){
    let action = { type: 'unknown' };
    let state = {
      currentLocale: [fakeData.locale[0]]
    };
    expect(localeReducer(state, action)).toEqual(state);
  });

  it('should return "state" with "currentLocale" array, that contain three expected elements. ActionType "GET_LOCALE_SUCCESS", "state" is empty', function(){
    let action = {
      type: types.GET_LOCALE_SUCCESS,
      currentLocale: fakeData.locale[0]
    };

    expect(localeReducer(undefined, action)).toEqual({currentLocale:  action.currentLocale});
  });

  it('should return "state" with "currentLocale" array, that contain three expected elements. ActionType "GET_LOCALE_SUCCESS", "state" has prefilled data', function(){
    let action = {
      type: types.GET_LOCALE_SUCCESS,
      currentLocale: fakeData.locale[1]
    };
    let state = {
      currentLocale: [fakeData.locale[0]]
    };

    expect(localeReducer(state, action)).toEqual({currentLocale:  action.currentLocale});
  });
});
