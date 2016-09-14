import * as forumSagas from "./forumSagas";
import * as chapterSagas from "./chapterSagas";
import * as navigationLinkSagas from "./navigationLinkSagas.js";

export default function* root() {
  yield [
    forumSagas.getForumsByChapterId(),
    chapterSagas.getAllChapters(),
    navigationLinkSagas.getNavigationLinks()
  ];
}
