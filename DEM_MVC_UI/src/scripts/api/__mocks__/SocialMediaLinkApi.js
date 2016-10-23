/* eslint no-undef: "off" */

import delay from 'api/__mocks__/delay';
import socialMediaLinks from 'api/__fakeData__/socialMediaLinks';

class SocialMediaLinkApi {
  static getSocialMediaLinks() {
    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve(Object.assign([], socialMediaLinks));
      }, delay);
    });
  }
}

export default SocialMediaLinkApi;
