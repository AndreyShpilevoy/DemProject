import { call, put, take } from 'redux-saga/effects';
import ChapterApi from 'api/__mocks__/ChapterApi';
import * as chapterActions from 'actions/chapterActions';
import * as types from 'enums/actionTypes';

export function* getAllChapters() {
  while(true){
    yield take(types.GET_ALL_CHAPTERS);
    const allChapters = yield call(ChapterApi.getAllChapters);
    yield put(chapterActions.getAllChaptersSuccess(allChapters));
  }
}

export function* getChapterById() {
  while(true){
    const { chapterId } = yield take(types.GET_CHAPTER_BY_ID);
    const chapterById = yield call(ChapterApi.getChapterById, chapterId);
    yield put(chapterActions.getChapterByIdSuccess(chapterById));
  }
}
