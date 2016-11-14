/* eslint import/no-extraneous-dependencies: 'off' */
import configureMockStore from 'redux-mock-store';
import * as fakeData from 'api/__fakeData__/index';

export const validFakeStoreData = {
  chapterReducer: {
    chapterById: fakeData.chapters[0],
    allChapters: [fakeData.chapters[2], fakeData.chapters[0], fakeData.chapters[1]]
  },
  forumReducer:{
    allForums: [
      {
        chapterId: 3,
        forumArray: [fakeData.forums[2], fakeData.forums[0], fakeData.forums[1]]
      }
    ]
  },
  topicReducer:{
    allTopics: [
      {
        forumId: 3,
        topicArray: [fakeData.topics[2], fakeData.topics[0], fakeData.topics[1]]
      }
    ]
  },
  postReducer:{
    allPosts: [
      {
        topicId: 1,
        postArray: [fakeData.posts[2], fakeData.posts[0], fakeData.posts[1]]
      }
    ]
  },
  localeReducer:{
    currentLocale: fakeData.locale
  },
  navigationLinkReducer:{
    navigationLinks: [fakeData.navigationLinks[2], fakeData.navigationLinks[0], fakeData.navigationLinks[1]]
  },
  lastActiveTopicReducer:{
    lastActiveTopics: [fakeData.lastActiveTopics[2], fakeData.lastActiveTopics[0], fakeData.lastActiveTopics[1]]
  },
  socialMediaLinkReducer:{
    socialMediaLinks: [fakeData.socialMediaLinks[1], fakeData.socialMediaLinks[0]]
  },
  notificationReducer:{
    allNotifications: [fakeData.notifications[0]]
  },
  breadcrumbsReducer: {
    breadcrumbArray: [fakeData.breadcrumbs[0],fakeData.breadcrumbs[1],fakeData.breadcrumbs[2]]
  }
};
export function sharedFakeStore(mockConfigId){
  const mockStore = configureMockStore();
  switch (mockConfigId){
    case 1:
      return mockStore(validFakeStoreData);
    case 2:
    //change forumId for topicReducer.allTopics[0] and for topicId for postReducer.allPosts
      return mockStore(Object.assign({}, validFakeStoreData,
        {topicReducer: {allTopics: [{forumId: 1, topicArray: [fakeData.topics[2], fakeData.topics[0], fakeData.topics[1]]}]}},
        {postReducer: {allPosts: [{topicId: 2, postArray: [fakeData.posts[2], fakeData.posts[0], fakeData.posts[1]]}]}}
      ));
    default:
      return mockStore();
    }
}
