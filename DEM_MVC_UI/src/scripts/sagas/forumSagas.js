import { call, put, take, fork } from 'redux-saga/effects';
import ForumApi from 'api/__mocks__/ForumApi';
import * as forumActions from 'actions/forumActions';
import * as types from 'enums/actionTypes';

export function* getForumsByChapterId() {
  while(true){
    const { chapterId } = yield take(types.GET_FORUMS_BY_CHAPTER_ID);
    yield fork(getForumsByChapterIdNonBlock, chapterId);
  }
}

export function* getForumsByChapterIdNonBlock(chapterId) {
  const forums = yield call(ForumApi.getForumsByChapterId, chapterId);
  yield put(forumActions.getForumsByChapterIdSuccess(chapterId, forums));
}
