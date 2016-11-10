/* eslint import/prefer-default-export: 'off' */

import { call, put, take, fork } from 'redux-saga/effects';
import BreadcrumbsApi from 'api/__mocks__/BreadcrumbsApi';
import * as breadcrumbsActions from 'actions/breadcrumbsActions';
import * as types from 'enums/actionTypes';

export function* getForumBreadcrumbs() {
  while(true){
    const { forumId } = yield take(types.GET_FORUM_BREADCRUMBS);
    yield fork(getBreadcrumbsByIdNonBlock, BreadcrumbsApi.getForumBreadcrumbs, forumId);
  }
}
export function* getTopicBreadcrumbs() {
  while(true){
    const { topicId } = yield take(types.GET_TOPIC_BREADCRUMBS);
    yield fork(getBreadcrumbsByIdNonBlock, BreadcrumbsApi.getTopicBreadcrumbs, topicId);
  }
}

export function* getBreadcrumbsByIdNonBlock(func, id) {
  const breadcrumbArray = yield call(func, id);
  yield put(breadcrumbsActions.getBreadcrumbsSuccess(breadcrumbArray));
}
