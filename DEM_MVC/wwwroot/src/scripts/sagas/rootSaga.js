import * as forumSagas from "./forumSagas";

export default function* root() {
  yield [
    forumSagas.getAllForums()
  ];
}
