/* eslint no-undef: "off" */
/*eslint no-unused-vars: "off"*/

import delay from 'api/__mocks__/delay';
import posts from 'api/__fakeData__/posts';

class PostApi {
    static getPostsByTopicId(topicId) {
      let result = [
        posts[0],
        posts[1],
        posts[2],
        posts[3],
        posts[4],
        Object.assign({}, posts[0], {id: 6, postTime: new Date("2015/01/06 10:10:10")}),
        Object.assign({}, posts[1], {id: 7, postTime: new Date("2015/01/07 10:10:10")}),
        Object.assign({}, posts[2], {id: 8, postTime: new Date("2015/01/08 10:10:10")}),
        Object.assign({}, posts[3], {id: 9, postTime: new Date("2015/01/09 10:10:10")}),
        Object.assign({}, posts[4], {id: 10, postTime: new Date("2015/01/10 10:10:10")}),
        Object.assign({}, posts[0], {id: 11, postTime: new Date("2015/01/11 10:10:10")}),
        Object.assign({}, posts[1], {id: 12, postTime: new Date("2015/01/12 10:10:10")}),
        Object.assign({}, posts[2], {id: 13, postTime: new Date("2015/01/13 10:10:10")}),
        Object.assign({}, posts[3], {id: 14, postTime: new Date("2015/01/14 10:10:10")}),
        Object.assign({}, posts[4], {id: 15, postTime: new Date("2015/01/15 10:10:10")}),
        Object.assign({}, posts[0], {id: 16, postTime: new Date("2015/01/16 10:10:10")}),
        Object.assign({}, posts[1], {id: 17, postTime: new Date("2015/01/17 10:10:10")}),
        Object.assign({}, posts[2], {id: 18, postTime: new Date("2015/01/18 10:10:10")}),
        Object.assign({}, posts[3], {id: 19, postTime: new Date("2015/01/19 10:10:10")}),
        Object.assign({}, posts[4], {id: 20, postTime: new Date("2015/01/20 10:10:10")}),
        Object.assign({}, posts[0], {id: 22, postTime: new Date("2015/01/21 10:10:10")}),
        Object.assign({}, posts[1], {id: 23, postTime: new Date("2015/01/22 10:10:10")}),
        Object.assign({}, posts[2], {id: 24, postTime: new Date("2015/01/23 10:10:10")}),
        Object.assign({}, posts[3], {id: 25, postTime: new Date("2015/01/24 10:10:10")}),
        Object.assign({}, posts[4], {id: 26, postTime: new Date("2015/01/25 10:10:10")}),
      ];
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(Object.assign([], result));
          }, delay);
      });
    }
}

export default PostApi;
