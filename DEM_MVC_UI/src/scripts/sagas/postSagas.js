import { call, put, take, fork } from 'redux-saga/effects';
import PostApi from 'api/__mocks__/PostApi';
import * as postActions from 'actions/postActions';
import * as types from 'enums/actionTypes';

export function* getPostsByTopicId() {
  while(true){
    const { topicId } = yield take(types.GET_POSTS_BY_TOPIC_ID);
    yield fork(getPostsByTopicIdNonBlock, topicId);
  }
}

export function* getPostsByTopicIdNonBlock(topicId) {
  const posts = yield call(PostApi.getPostsByTopicId, topicId);
  yield put(postActions.getPostsByTopicIdSuccess(topicId, posts));
}
