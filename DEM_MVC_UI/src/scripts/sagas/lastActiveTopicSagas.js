/* eslint import/prefer-default-export: "off" */

import { call, put, take } from "redux-saga/effects";
import LastActiveTopicApi from "api/__mocks__/LastActiveTopicApi";
import * as lastActiveTopicActions from "actions/lastActiveTopicActions";
import * as types from "actions/actionTypes";

export function* getLastActiveTopics() {
  while(true){
    yield take(types.GET_LAST_ACTIVE_TOPICS);
    const lastActiveTopics = yield call(LastActiveTopicApi.getLastActiveTopics);
    yield put(lastActiveTopicActions.getLastActiveTopicsSuccess(lastActiveTopics));
  }
}
