/*eslint no-undef: "off"*/

import * as types from "../../actions/actionTypes";
import socialMediaLinkReducer from "../socialMediaLinkReducer";

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
      socialMediaLinks: [
        {
          id: 1,
          title: 'Steam - Ex Machina Community',
          svgName: 'Steam',
          href: 'http://steamcommunity.com/groups/Ex_Machina',
          order: 1
        },
        {
          id: 2,
          title: 'VK - Ex Machina group',
          svgName: 'Vk',
          href: 'https://vk.com/exmachina2',
          order: 2
        }
      ]
    };
    // execute
    let newState = socialMediaLinkReducer(undefined, action);
    // verify
    expect(newState).toEqual({socialMediaLinks:  action.socialMediaLinks});
  });
});
