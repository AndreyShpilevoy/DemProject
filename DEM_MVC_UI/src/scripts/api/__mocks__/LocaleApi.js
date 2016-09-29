/* eslint no-undef: "off" */

import delay from './delay';

const locale = {locale: "ru"};

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