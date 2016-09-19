import * as forumSagas from "./forumSagas";
import * as chapterSagas from "./chapterSagas";
import * as navigationLinkSagas from "./navigationLinkSagas";
import * as termTranslationSaga from "./termTranslationSaga";

export default function* root() {
  yield [
    forumSagas.getForumsByChapterId(),
    chapterSagas.getAllChapters(),
    navigationLinkSagas.getNavigationLinks(),
    termTranslationSaga.getTermTranslation()
  ];
}
