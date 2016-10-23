/* eslint no-undef: "off" */

import delay from 'api/__mocks__/delay';
import lastActiveTopics from 'api/__fakeData__/lastActiveTopics';

class LastActiveTopicApi {
  static getLastActiveTopics() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Object.assign([], lastActiveTopics));
        }, delay);
    });
  }
}

export default LastActiveTopicApi;
