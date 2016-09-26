/*eslint no-undef: "off"*/

import * as types from "../../actions/actionTypes";
import chapterReducer from "../chapterReducer";

describe('chapterReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = chapterReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>allChapters</code> in given action GET_ALL_CHAPTERS_SUCCESS', function(){
    // setup
    let action = {
      type: types.GET_ALL_CHAPTERS_SUCCESS,
      allChapters: [
        {id: 4, title: "Модификации для игр серии Ex Machina", order: 4},
        {id: 1, title: "Ex Machina", order: 1}
      ]
    };
    // execute
    let newState = chapterReducer(undefined, action);
    // verify
    expect(newState).toEqual({allChapters:  action.allChapters});
  });

  it('returns the <code>chapterById</code> in given action GET_CHAPTER_BY_ID_SUCCESS', function(){
    // setup
    let action = {
      type: types.GET_CHAPTER_BY_ID_SUCCESS,
      chapterById: {id: 1, title: "Ex Machina", order: 1}
    };
    // execute
    let newState = chapterReducer(undefined, action);
    // verify
    expect(newState).toEqual({chapterById:  action.chapterById});
  });
});

// import * as types from "../actions/actionTypes";
//
// export default function chapterReducer(state = [], action) {
//     switch (action.type) {
//         case types.GET_ALL_CHAPTERS_SUCCESS:
//           return Object.assign({}, state, {
//             allChapters: action.allChapters
//           });
//
//         case types.GET_CHAPTER_BY_ID_SUCCESS:
//           return Object.assign({}, state, {
//             chapterById: action.chapterById
//           });
//
//         default:
//           return state;
//     }
// }
