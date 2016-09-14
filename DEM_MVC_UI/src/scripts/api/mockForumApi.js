/* eslint no-undef: "off" */

import delay from './delay';

const forums = [{
    id: 1,
    order: 1,
    title: "Общие вопросы",
    description: "Все вопросы касательно геймплея и мира игры Ex Machina в целом.",
    topicsCount: 26,
    postsCount: 4113,
    lastActiveTopicId: 1,
    lastActiveTopic: "Идеи к Ex Machina -2 часть четвертая",
    latesPostTimeCreation: new Date("2015/08/17 13:42:32"),
    latesPostAutorId: 1,
    latesPostAutorName: "kto",
    latesPostAutorGroupColor: "ffa510",
    subforums: [{
        id: 11,
        title: "Самопал",
    },{
        id: 12,
        title: "Архив форумки",
    }]
}, {
    id: 2,
    order: 2,
    title: "Технические вопросы",
    description: "Вопросы технического характера по игре Ex Machina.",
    topicsCount: 13,
    postsCount: 857,
    lastActiveTopicId: 2,
    lastActiveTopic: "Проблемы с игрой",
    latesPostTimeCreation: new Date("2015/07/20 12:53:09"),
    latesPostAutorId: 2,
    latesPostAutorName: "Bykawka",
    latesPostAutorGroupColor: "fbeab2",
    subforums: []
},{
    id: 3,
    order: 3,
    title: "Обсуждение модификаций",
    description: "Раздел для общих и технических вопросов по модификациям.",
    topicsCount: 37,
    postsCount: 4328,
    lastActiveTopicId: 3,
    lastActiveTopic: "Hard Truck Apocalypse MOD 1.7SE",
    latesPostTimeCreation: new Date("2015/07/02 23:11:31"),
    latesPostAutorId: 3,
    latesPostAutorName: "ololoid",
    latesPostAutorGroupColor: "99ccff",
    subforums: [{
        id: 31,
        title: "Багтрекер",
    }]
},{
    id: 4,
    order: 4,
    title: "Вопросы по созданию моделей",
    description: "Вопросы по созданию моделей, конвертированию в игру и всего что с этим связано.",
    topicsCount: 4,
    postsCount: 864,
    lastActiveTopicId: 4,
    lastActiveTopic: "Exporter Ex Machina for Maya",
    latesPostTimeCreation: new Date("2016/09/06 22:33:09"),
    latesPostAutorId: 4,
    latesPostAutorName: "Buba",
    latesPostAutorGroupColor: "00AA00",
    subforums: []
},{
    id: 5,
    order: 5,
    title: "Системный раздел для главной",
    description: "В разделе публикуются статьи, файлы, FAQ и другие полезности для Главной страницы.",
    topicsCount: 93,
    postsCount: 1576,
    lastActiveTopicId: 5,
    lastActiveTopic: "HD Textures",
    latesPostTimeCreation: new Date("2016/07/12 14:24:11"),
    latesPostAutorId: 5,
    latesPostAutorName: "Agent005",
    latesPostAutorGroupColor: "ff00ff",
    subforums: [{
        id: 51,
        title: "FAQ",
    },{
        id: 52,
        title: "Юзербары",
    },{
        id: 53,
        title: "О игре",
    },{
        id: 54,
        title: "Видео",
    },{
        id: 55,
        title: "Рассказы",
    },{
        id: 56,
        title: "Каталог файлов",
    }]
}];

class ForumApi {
    static getAllForums(chapterId) {
      let result = [];
      switch (chapterId) {
        case 1:
          result.push(forums[0]);
          result.push(forums[1]);
          break;
        case 2:
          result.push(forums[2]);
          break;
        case 3:
          result.push(forums[3]);
          result.push(forums[4]);
          break;
        case 4:
          result.push(forums[0]);
          result.push(forums[2]);
          result.push(forums[1]);
          break;
        case 5:
          result.push(forums[0]);
          result.push(forums[2]);
          result.push(forums[1]);
          result.push(forums[4]);
          result.push(forums[3]);
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
