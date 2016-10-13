/* eslint no-undef: "off" */

import delay from './delay';
import socialMediaLinks from '../__fakeData__/socialMediaLinks';

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
