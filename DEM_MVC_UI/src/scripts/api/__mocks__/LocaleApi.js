/* eslint no-undef: "off" */

import delay from './delay';
import {locale} from '../__fakeData__/_all';

class LocaleApi {
  static getLocale() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, locale));
      }, delay);
    });
  }
}

export default LocaleApi;
