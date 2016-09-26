import * as forumSagas from "./forumSagas";
import * as chapterSagas from "./chapterSagas";
import * as navigationLinkSagas from "./navigationLinkSagas";
import * as socialMediaLinkSagas from "./socialMediaLinkSagas";
import * as localeSagas from "./localeSagas";

export default function* root() {
  yield [
    forumSagas.getForumsByChapterId(),
    chapterSagas.getAllChapters(),
    chapterSagas.getChapterById(),
    navigationLinkSagas.getNavigationLinks(),
    socialMediaLinkSagas.getSocialMediaLinks(),
    localeSagas.getLocale()
  ];
}
