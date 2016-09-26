/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as socialMediaLinkActions from "../socialMediaLinkActions";


describe('socialMediaLinkActions', () => {
  it('should create an action to get social Media Links', () => {
    const expectedAction = {type: types.GET_SOCIALMEDIALINKS};
    expect(socialMediaLinkActions.getSocialMediaLinks()).toEqual(expectedAction);
  });

  it('should create an action to get social Media Links on success', () => {
    const socialMediaLinks = [{
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
    }];
    const expectedAction = {
      type: types.GET_SOCIALMEDIALINKS_SUCCESS,
      socialMediaLinks
    };
    expect(socialMediaLinkActions.getSocialMediaLinksSuccess(socialMediaLinks)).toEqual(expectedAction);
  });
});
