import * as forumSagas from "sagas/forumSagas";
import * as topicSagas from "sagas/topicSagas";
import * as postSagas from "sagas/postSagas";
import * as lastActiveTopicSagas from "sagas/lastActiveTopicSagas";
import * as chapterSagas from "sagas/chapterSagas";
import * as navigationLinkSagas from "sagas/navigationLinkSagas";
import * as socialMediaLinkSagas from "sagas/socialMediaLinkSagas";
import * as localeSagas from "sagas/localeSagas";
import * as breadcrumbsSagas from "sagas/breadcrumbsSagas";

export default function* root() {
  yield [
    forumSagas.getForumsByChapterId(),
    topicSagas.getTopicsByForumId(),
    postSagas.getPostsByTopicId(),
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
