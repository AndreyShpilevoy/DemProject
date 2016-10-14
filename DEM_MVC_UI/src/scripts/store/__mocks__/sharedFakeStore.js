/* eslint import/no-extraneous-dependencies: "off" */
import configureMockStore from 'redux-mock-store';
import * as fakeData from "../../api/__fakeData__/index";

export const sharedFakeStoreData = {
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
        allTopics: [fakeData.topics[2], fakeData.topics[0], fakeData.topics[1]]
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
  }
};
export function sharedFakeStore(valid=true){
  const mockStore = configureMockStore();
  return valid ? mockStore(sharedFakeStoreData) : mockStore();
}
