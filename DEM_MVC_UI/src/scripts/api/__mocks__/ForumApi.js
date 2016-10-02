/* eslint no-undef: "off" */

import delay from './delay';

const forums = [{
    id: 10,
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
    subForumList: [{
        id: 11,
        title: "Самопал",
        order: 35
    },{
        id: 12,
        title: "Архив форумки",
        order: 12
    }]
}, {
    id: 20,
    order: 2,
    title: "Технические вопросы",
    description: "Вопросы технического характера по игре Ex Machina.",
    topicsCount: 13,
    postsCount: 857,
    lastActiveTopicId: 2,
    lastActiveTopic: "Проблемы с игрой",
    latesPostTimeCreation: new Date("2016/9/22 12:53:09"),
    latesPostAutorId: 2,
    latesPostAutorName: "Bykawka",
    latesPostAutorGroupColor: "fbeab2"
},{
    id: 30,
    order: 3,
    title: "Обсуждение модификаций",
    description: "Раздел для общих и технических вопросов по модификациям.",
    topicsCount: 37,
    postsCount: 4328,
    lastActiveTopicId: 3,
    lastActiveTopic: "Hard Truck Apocalypse MOD 1.7SE",
    latesPostTimeCreation: new Date("2014/07/02 23:11:31"),
    latesPostAutorId: 3,
    latesPostAutorName: "ololoid",
    latesPostAutorGroupColor: "99ccff",
    subForumList: [{
        id: 31,
        title: "Багтрекер",
        order: 27
    }]
},{
    id: 40,
    order: 4,
    title: "Вопросы по созданию моделей",
    description: "Вопросы по созданию моделей, конвертированию в игру и всего что с этим связано.",
    topicsCount: 4,
    postsCount: 864,
    lastActiveTopicId: 4,
    lastActiveTopic: "Exporter Ex Machina for Maya",
    latesPostTimeCreation: new Date("2007/09/06 22:33:09"),
    latesPostAutorId: 4,
    latesPostAutorName: "Buba",
    latesPostAutorGroupColor: "00AA00"
},{
    id: 50,
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
    subForumList: [{
        id: 51,
        title: "FAQ",
        order: 51
    },{
        id: 52,
        title: "Юзербары",
        order: 52
    },{
        id: 53,
        title: "О игре",
        order: 53
    },{
        id: 54,
        title: "Видео",
        order: 54
    },{
        id: 55,
        title: "Рассказы",
        order: 55
    },{
        id: 56,
        title: "Каталог файлов",
        order: 56
    }]
}];

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
