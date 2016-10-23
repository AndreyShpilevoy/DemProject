/* eslint no-undef: "off" */
/*eslint no-unused-vars: "off"*/

import delay from 'api/__mocks__/delay';
import posts from 'api/__fakeData__/posts';

class PostApi {
    static getTopicsByForumId(topicId) {
      let result = [
        posts[0],
        posts[1],
        posts[2],
        posts[3],
        posts[4],
        Object.assign({}, posts[0], {id: 6}),
        Object.assign({}, posts[1], {id: 7}),
        Object.assign({}, posts[2], {id: 8}),
        Object.assign({}, posts[3], {id: 9}),
        Object.assign({}, posts[4], {id: 10}),
        Object.assign({}, posts[0], {id: 11}),
        Object.assign({}, posts[1], {id: 12}),
        Object.assign({}, posts[2], {id: 13}),
        Object.assign({}, posts[3], {id: 14}),
        Object.assign({}, posts[4], {id: 15}),
        Object.assign({}, posts[0], {id: 16}),
        Object.assign({}, posts[1], {id: 17}),
        Object.assign({}, posts[2], {id: 18}),
        Object.assign({}, posts[3], {id: 19}),
        Object.assign({}, posts[4], {id: 20}),
        Object.assign({}, posts[0], {id: 22}),
        Object.assign({}, posts[1], {id: 23}),
        Object.assign({}, posts[2], {id: 24}),
        Object.assign({}, posts[3], {id: 25}),
        Object.assign({}, posts[4], {id: 26}),
      ];
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(Object.assign([], result));
          }, delay);
      });
    }
}

export default PostApi;
