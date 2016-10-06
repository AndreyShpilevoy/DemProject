/* eslint no-undef: "off" */

import delay from './delay';
import {navigationLinks} from '../__fakeData__/_all';

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
