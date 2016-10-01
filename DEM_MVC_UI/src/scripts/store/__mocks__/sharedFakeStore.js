/* eslint import/no-extraneous-dependencies: "off" */
import configureMockStore from 'redux-mock-store';

export const sharedFakeStoreData = {
  chapterReducer: {
    chapterById: {
      id: 4,
      title: "Chapter title",
      order: 4
    },

    allChapters: [
      {
        id: 1,
        title: "ChapteItemId-1",
        order: 1,
      },
      {
        id: 3,
        title: "ChapteItemId-3",
        order: 3,
      },
      {
        id: 2,
        title: "ChapteItemId-2",
        order: 2,
      }
    ]
  },
  forumReducer:{
    allForums: [
      {
        chapterId: 3,
        forumList: [
          {
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
            subForumList: [
              {
                id: 11,
                title: "Самопал",
                order: 35
              },{
                id: 12,
                title: "Архив форумки",
                order: 12
              }
            ]
          },
          {
            id: 2,
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
          },
          {
            id: 3,
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
            subForumList: [
              {
                id: 31,
                title: "Багтрекер",
                order: 27
              }
            ]
          }
        ]
      }
    ]
  },
  localeReducer:{
    currentLocale: {
      locale: "ru"
    }
  },
  navigationLinkReducer:{
    navigationLinks: [
      {id: 1, title: 'Conference', href: '/', order: 1},
      {id: 3, title: 'Link 3 autogen', href: '/', order: 3},
      {id: 2, title: 'Link 2 autogen', href: '/', order: 2}
    ]
  },
  socialMediaLinkReducer:{
    socialMediaLinks: [
      {
        id: 1,
        title: 'Steam - Ex Machina Community',
        svgName: 'Steam',
        href: 'http://steamcommunity.com/groups/Ex_Machina',
        order: 1
      },
      {
        id: 2,
        title: 'VK - Ex Machina group',
        svgName: 'Vk',
        href: 'https://vk.com/exmachina2',
        order: 2
      }
    ]
  }
};
export function sharedFakeStore(valid=true){
  const mockStore = configureMockStore();
  return valid ? mockStore(sharedFakeStoreData) : mockStore();
}
