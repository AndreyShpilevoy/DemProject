/* eslint no-undef: "off" */

import delay from './delay';
import forums from '../__fakeData__/forums';

class ForumApi {
    static getForumsByChapterId(chapterId) {
      let result = [];
      switch (chapterId) {
        case 1:
        case 10:
        case 11:
        case 12:
          result.push(forums[0]);
          result.push(forums[1]);
          break;
        case 2:
        case 20:
          result.push(forums[1]);
          result.push(forums[0]);
          break;
        case 3:
        case 30:
        case 31:
          result.push(forums[1]);
          break;
        case 4:
        case 40:
          result.push(forums[0]);
          result.push(forums[1]);
          result.push(forums[2]);
          result.push(forums[3]);
          break;
        case 5:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
          result.push(forums[0]);
          result.push(forums[1]);
          result.push(forums[4]);
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

export default ForumApi;
