/* eslint no-undef: "off" */

import delay from './delay';

const chapters = [
  {id: 4, title: "Модификации для игр серии Ex Machina", order: 4},
  {id: 1, title: "Ex Machina", order: 1},
  {id: 2, title: "Ex Machina Меридиан 113", order: 2},
  {id: 3, title: "Ex Machina: Arcade", order: 3},
  {id: 5, title: "Административный раздел", order: 5}
];

let chapter = (id) => {
  return chapters.find(chapter => chapter.id == id);
};

class ChapterApi {
  static getAllChapters() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], chapters));
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
