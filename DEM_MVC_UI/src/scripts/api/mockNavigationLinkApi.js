/* eslint no-undef: "off" */

import delay from './delay';

const navigationLinks  = [
  {id: 1, title: 'Conference', href: '/', order: 1},
  {id: 3, title: 'Link 3 autogen', href: '/', order: 3},
  {id: 4, title: 'Link 4 autogen', href: '/', order: 4},
  {id: 2, title: 'Link 2 autogen', href: '/', order: 2},
  {id: 5, title: 'Link 5 autogen', href: '/', order: 5}
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
