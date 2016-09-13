/* eslint no-undef: "off" */

import delay from './delay';

const chapters = [{
  id: 1,
  title: "Модификации для игр серии Ex Machina",
  order: 0
}, {
  id: 2,
  title: "Ex Machina",
  order: 0
}, {
  id: 3,
  title: "Ex Machina Меридиан 113",
  order: 0
}, {
  id: 4,
  title: "Ex Machina: Arcade",
  order: 0
}, {
  id: 5,
  title: "Административный раздел",
  order: 0
}];

class ChapterApi {
  static getAllChapters() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], chapters));
      }, delay);
    });
  }
}

export default ChapterApi;
