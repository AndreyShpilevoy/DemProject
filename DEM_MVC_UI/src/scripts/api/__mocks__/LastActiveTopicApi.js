/* eslint no-undef: "off" */

import delay from './delay';

const lastActiveTopics = [{
    id: 1,
    title: "Как деактивировать бомбу",
    postsCount: 215,
    topicViewsCount: 1315,
    latesPostTimeCreation: new Date("2016/09/19 13:42:32"),
    latesPostAutorId: 4,
    latesPostAutorName: "Buba",
    latesPostAutorAvatart: "http://i70.fastpic.ru/big/2015/0628/36/ccbb1e2cb8ba8dbd379a6a12dc6b8336.jpg",
    latesPostAutorGroupColor: "00AA00",
    parentForumId: 10,
    parentForumTitle: "Общие вопросы"
}, {
    id: 2,
    title: "Как активировать бомбу.",
    postsCount: 57,
    topicViewsCount: 847,
    latesPostTimeCreation: new Date("2016/09/22 12:53:09"),
    latesPostAutorId: 2,
    latesPostAutorName: "Bykawka",
    latesPostAutorAvatart: undefined,
    latesPostAutorGroupColor: "fbeab2",
    parentForumId: 20,
    parentForumTitle: "Технические вопросы"
},{
    id: 3,
    title: "Почему админы дебилы [закрыто намертво]",
    postsCount: 218,
    topicViewsCount: 82847,
    latesPostTimeCreation: new Date("2016/07/12 14:24:11"),
    latesPostAutorId: 5,
    latesPostAutorName: "Agent005",
    latesPostAutorAvatart: "https://pp.vk.me/c9558/u61600334/a_153d373f.jpg",
    latesPostAutorGroupColor: "ff00ff",
    parentForumId: 30,
    parentForumTitle: "Обсуждение модификаций"
},{
    id: 4,
    title: "Какое ваше любимое оружие в Manhunt",
    postsCount: 207,
    topicViewsCount: 4827,
    latesPostTimeCreation: new Date("2016/05/02 23:11:31"),
    latesPostAutorId: 3,
    latesPostAutorName: "ololoid",
    latesPostAutorAvatart: "http://i72.fastpic.ru/big/2015/0522/10/f93fff451e934900bfb1463615b5b310.png",
    latesPostAutorGroupColor: "99ccff",
    parentForumId: 40,
    parentForumTitle: "Вопросы по созданию моделей"
},{
    id: 5,
    title: "Вопросы по созданию моделей",
    postsCount: 4,
    topicViewsCount: 9000,
    latesPostTimeCreation: new Date("2016/01/01 22:33:09"),
    latesPostAutorId: 1,
    latesPostAutorName: "kto",
    latesPostAutorAvatart: "http://i69.fastpic.ru/big/2015/0729/7e/6a397a33426917b4087e403270383c7e.gif",
    latesPostAutorGroupColor: "ffa510",
    parentForumId: 50,
    parentForumTitle: "Системный раздел для главной"
}];

class LastActiveTopicApi {
  static getLastActiveTopics() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Object.assign([], lastActiveTopics));
        }, delay);
    });
  }
}

export default LastActiveTopicApi;