/* eslint no-undef: "off" */

import delay from 'api/__mocks__/delay';
import chapters from 'api/__fakeData__/chapters';

let chapter = (id) => {
  return chapters.find(chapter => chapter.id == id);
};

class ChapterApi {
  static getAllChapters() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], chapters.slice(0, 5)));
      }, delay);
    });
  }
  static getChapterById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, chapter(id)));
      }, delay);
    });
  }
}

export default ChapterApi;
