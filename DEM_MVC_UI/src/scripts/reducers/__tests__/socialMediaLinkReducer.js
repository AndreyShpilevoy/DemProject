/*eslint no-undef: 'off'*/

import * as types from 'enums/actionTypes';
import socialMediaLinkReducer from 'reducers/socialMediaLinkReducer';
import * as fakeData from 'api/__fakeData__/index';

describe('socialMediaLinkReducer', function(){
  it('should return empty array if Action Type wasnt handled and Store is empty', function(){
    let action = { type: 'unknown' };

    expect(socialMediaLinkReducer(undefined, action)).toEqual([]);
  });

  it('should return "state" without changes if Action Type wasnt handled and "state" has predifined data', function(){
    let action = { type: 'unknown' };
    let state = {
      socialMediaLinks: [fakeData.socialMediaLinks[0],fakeData.socialMediaLinks[1]]
    };
    expect(socialMediaLinkReducer(state, action)).toEqual(state);
  });

    it('should return "state" with "socialMediaLinks" array, that contain three expected elements. ActionType "GET_SOCIALMEDIALINKS_SUCCESS", "state" is empty', function(){
      let action = {
        type: types.GET_SOCIALMEDIALINKS_SUCCESS,
        socialMediaLinks: [fakeData.socialMediaLinks[0], fakeData.socialMediaLinks[1], fakeData.socialMediaLinks[2]]
      };

      expect(socialMediaLinkReducer(undefined, action)).toEqual({socialMediaLinks:  action.socialMediaLinks});
    });

    it('should return "state" with "socialMediaLinks" array, that contain two expected elements which replaced prefilled data. ActionType "GET_SOCIALMEDIALINKS_SUCCESS", "state" has prefilled data', function(){
      let action = {
        type: types.GET_SOCIALMEDIALINKS_SUCCESS,
        socialMediaLinks: [fakeData.socialMediaLinks[0], fakeData.socialMediaLinks[1]]
      };
      let state = {
        socialMediaLinks: [fakeData.socialMediaLinks[2]]
      };

      expect(socialMediaLinkReducer(state, action)).toEqual({socialMediaLinks: action.socialMediaLinks});
    });
});
