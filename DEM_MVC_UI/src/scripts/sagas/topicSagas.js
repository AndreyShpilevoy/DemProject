import { call, put, take, fork } from 'redux-saga/effects';
import TopicApi from 'api/__mocks__/TopicApi';
import * as topicActions from 'actions/topicActions';
import * as types from 'enums/actionTypes';

export function* getTopicsByForumId() {
  while(true){
    const { forumId } = yield take(types.GET_TOPICS_BY_FORUM_ID);
    yield fork(getTopicsByForumIdNonBlock, forumId);
  }
}

export function* getTopicsByForumIdNonBlock(forumId) {
  const topics = yield call(TopicApi.getTopicsByForumId, forumId);
  yield put(topicActions.getTopicsByForumIdSuccess(forumId, topics));
}
