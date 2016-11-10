/* eslint import/prefer-default-export: 'off' */

import { call, put, take } from 'redux-saga/effects';
import NavigationLinkApi from 'api/__mocks__/NavigationLinkApi';
import * as navigationLinkActions from 'actions/navigationLinkActions';
import * as types from 'enums/actionTypes';

export function* getNavigationLinks() {
  while(true){
    yield take(types.GET_NAVIGATIONLINKS);
    const navigationLinks = yield call(NavigationLinkApi.getNavigationLinks);
    yield put(navigationLinkActions.getNavigationLinksSuccess(navigationLinks));
  }
}
