/* eslint no-undef: "off" */

import delay from './delay';

const chapters = [
  {id: 4, title: "Модификации для игр серии Ex Machina", order: 4},
  {id: 1, title: "Ex Machina", order: 1},
  {id: 2, title: "Ex Machina Меридиан 113", order: 2},
  {id: 3, title: "Ex Machina: Arcade", order: 3},
  {id: 5, title: "Административный раздел", order: 5},
  {id: 10, title: "Общие вопросы", order: 10},
  {id: 11, title: "Самопал", order: 11},
  {id: 12, title: "Архив форумки", order: 12},
  {id: 20, title: "Технические вопросы", order: 20},
  {id: 30, title: "Обсуждение модификаций", order: 30},
  {id: 31, title: "Багтрекер", order: 31},
  {id: 40, title: "Вопросы по созданию моделей", order: 40},
  {id: 50, title: "Системный раздел для главной", order: 50},
  {id: 51, title: "FAQ", order: 51},
  {id: 52, title: "Юзербары", order: 52},
  {id: 53, title: "О игре", order: 53},
  {id: 54, title: "Видео", order: 54},
  {id: 55, title: "Рассказы", order: 55},
  {id: 56, title: "Каталог файлов", order: 56}
];

let chapter = (id) => {
  return chapters.find(chapter => chapter.id == id);
};

class ChapterApi {
  static getAllChapters() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], chapters.slice(0, 6)));
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
