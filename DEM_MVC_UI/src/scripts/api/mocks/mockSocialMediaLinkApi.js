/* eslint no-undef: "off" */

import delay from './delay';

const socialMediaLinks  = [
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
  }];

class SocialMediaLinksApi {
  static getSocialMediaLinks() {
    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve(Object.assign([], socialMediaLinks));
      }, delay);
    });
  }
}

export default SocialMediaLinksApi;
