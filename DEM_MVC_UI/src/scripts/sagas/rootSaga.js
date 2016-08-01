import * as forumSagas from "./forumSagas";
import * as authorSagas from "./authorSagas";

export default function* root() {
  yield [
    forumSagas.getAllForums(),
    authorSagas.getAllAuthors()
  ];
}
