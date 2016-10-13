/* eslint no-undef: "off" */

import delay from './delay';
import topics from '../__fakeData__/topics';

class TopicApi {
    static getTopicsByForumId(forumId) {
      let result = [];
      switch (parseInt(forumId)) {
        case 1:
        case 10:
        case 11:
        case 12:
          result.push(topics[0]);
          result.push(topics[1]);
          break;
        case 2:
        case 20:
          result.push(topics[1]);
          result.push(topics[0]);
          break;
        case 3:
        case 30:
        case 31:
          result.push(topics[1]);
          break;
        case 4:
        case 40:
          result.push(topics[0]);
          result.push(topics[1]);
          result.push(topics[2]);
          result.push(topics[3]);
          break;
        case 5:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
          result.push(topics[0]);
          result.push(topics[1]);
          result.push(topics[4]);
          break;
        default:
      }
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(Object.assign([], result));
          }, delay);
      });
    }
}

export default TopicApi;
