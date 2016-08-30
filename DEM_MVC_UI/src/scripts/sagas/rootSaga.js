import * as forumSagas from "./forumSagas";
import * as authorSagas from "./authorSagas";
import * as navigationLinkSagas from "./navigationLinkSagas.js";

export default function* root() {
  yield [
    forumSagas.getAllForums(),
    authorSagas.getAllAuthors(),
    navigationLinkSagas.getNavigationLinks()
  ];
}
