/* eslint no-undef: "off" */

import delay from './delay';

const navigationLinks  = [
  {id:"navigationLinks-1", content:'Forums',link:'/'},
  {id:"navigationLinks-2", content:'Topics',link:'/topics'},
  {id:"navigationLinks-3", content:'Link 3 autogen',link:'/'}
];

class NavigationLinkApi {
  static getNavigationLinks() {
    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve(Object.assign([], navigationLinks));
      }, delay);
    });
  }
}

export default NavigationLinkApi;
