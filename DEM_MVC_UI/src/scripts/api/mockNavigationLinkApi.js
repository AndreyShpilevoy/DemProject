/* eslint no-undef: "off" */

import delay from './delay';

const navigationLinks  = [
  {id:"navigationLinks-1", sequence: 0, title:'Conference', href:'/'},
  {id:"navigationLinks-3", sequence: 2, title:'Link 3 autogen', href:'/'},
  {id:"navigationLinks-4", sequence: 3, title:'Link 4 autogen', href:'/'},
  {id:"navigationLinks-2", sequence: 1, title:'Link 2 autogen', href:'/'},
  {id:"navigationLinks-5", sequence: 4, title:'Link 5 autogen', href:'/'}
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
