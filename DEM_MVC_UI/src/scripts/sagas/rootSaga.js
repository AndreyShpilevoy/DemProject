import * as forumSagas from "./forumSagas";
import * as topicSagas from "./topicSagas";
import * as lastActiveTopicSagas from "./lastActiveTopicSagas";
import * as chapterSagas from "./chapterSagas";
import * as navigationLinkSagas from "./navigationLinkSagas";
import * as socialMediaLinkSagas from "./socialMediaLinkSagas";
import * as localeSagas from "./localeSagas";
import * as breadcrumbsSagas from "./breadcrumbsSagas";

export default function* root() {
  yield [
    forumSagas.getForumsByChapterId(),
    topicSagas.getTopicsByForumId(),
    lastActiveTopicSagas.getLastActiveTopics(),
    chapterSagas.getAllChapters(),
    chapterSagas.getChapterById(),
    navigationLinkSagas.getNavigationLinks(),
    socialMediaLinkSagas.getSocialMediaLinks(),
    localeSagas.getLocale(),
    breadcrumbsSagas.getForumBreadcrumbs(),
    breadcrumbsSagas.getTopicBreadcrumbs()
  ];
}
