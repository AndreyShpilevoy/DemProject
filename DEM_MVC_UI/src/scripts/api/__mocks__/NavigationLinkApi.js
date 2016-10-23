/* eslint no-undef: "off" */

import delay from 'api/__mocks__/delay';
import navigationLinks from 'api/__fakeData__/navigationLinks';

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
