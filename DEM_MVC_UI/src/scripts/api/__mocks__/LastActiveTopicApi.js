/* eslint no-undef: "off" */

import delay from './delay';
import {lastActiveTopics} from '../__fakeData__/_all';

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
