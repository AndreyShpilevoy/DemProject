/* eslint no-undef: "off" */

import delay from 'api/__mocks__/delay';
import locale from 'api/__fakeData__/locale';

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
