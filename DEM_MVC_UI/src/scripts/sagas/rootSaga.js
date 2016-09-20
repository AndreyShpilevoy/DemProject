import * as forumSagas from "./forumSagas";
import * as chapterSagas from "./chapterSagas";
import * as navigationLinkSagas from "./navigationLinkSagas";
import * as localeSagas from "./localeSagas";

export default function* root() {
  yield [
    forumSagas.getForumsByChapterId(),
    chapterSagas.getAllChapters(),
    navigationLinkSagas.getNavigationLinks(),
    localeSagas.getLocale()
  ];
}
