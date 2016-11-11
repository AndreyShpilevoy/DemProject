import * as types from 'enums/actionTypes';

export default function localeReducer(state = [], action) {
  let localState = state;
    switch (action.type) {
        case types.GET_LOCALE_SUCCESS:
        localState = Object.assign({}, state, {
          currentLocale: action.currentLocale
        });
    }
    return localState;
}
