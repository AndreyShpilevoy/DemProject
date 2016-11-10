import * as types from 'enums/actionTypes';

export default function chapterReducer(state = [], action) {
  let localeState = state;
    switch (action.type) {
      case types.GET_ALL_CHAPTERS_SUCCESS:
        localeState = Object.assign({}, localeState, {
          allChapters: action.allChapters
        });
        break;

      case types.GET_CHAPTER_BY_ID_SUCCESS:
        localeState = Object.assign({}, localeState, {
          chapterById: action.chapterById
        });
        break;
    }
    return localeState;
}
