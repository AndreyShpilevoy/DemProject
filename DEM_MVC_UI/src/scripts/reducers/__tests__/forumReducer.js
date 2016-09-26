/*eslint no-undef: "off"*/

import * as types from "../../actions/actionTypes";
import forumReducer from "../forumReducer";

describe('forumReducer', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };
    // execute
    let newState = forumReducer(undefined, action);
    // verify
    expect(newState).toEqual([]);
  });

  it('returns the <code>allForums</code> in given action GET_FORUMS_BY_CHAPTER_ID_SUCCESS when state is empty.allForums array', function(){
    // setup
    let action = {
      type: types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS,
      allForums:
        [
          {
            id: 2,
            order: 2,
            title: "Технические вопросы",
            description: "Вопросы технического характера по игре Ex Machina.",
            topicsCount: 13,
            postsCount: 857,
            lastActiveTopicId: 2,
            lastActiveTopic: "Проблемы с игрой",
            latesPostTimeCreation: new Date("2016/9/22 12:53:09"),
            latesPostAutorId: 2,
            latesPostAutorName: "Bykawka",
            latesPostAutorGroupColor: "fbeab2"
          }
        ]
    };
    // execute
    let newState = forumReducer(undefined, action);
    // verify
    expect(newState).toEqual({allForums:  [
      {chapterId: action.chapterId, forumList: action.forums}
    ]});
  });


  it('returns the <code>allForums</code> in given action GET_FORUMS_BY_CHAPTER_ID_SUCCESS when state.allForums is not empty ', function(){
    // setup
    let preloadedForum = {
        id: 4,
        order: 4,
        title: "Вопросы по созданию моделей",
        description: "Вопросы по созданию моделей, конвертированию в игру и всего что с этим связано.",
        topicsCount: 4,
        postsCount: 864,
        lastActiveTopicId: 4,
        lastActiveTopic: "Exporter Ex Machina for Maya",
        latesPostTimeCreation: new Date("2007/09/06 22:33:09"),
        latesPostAutorId: 4,
        latesPostAutorName: "Buba",
        latesPostAutorGroupColor: "00AA00"
    };
    let action = {
      type: types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS,
      allForums:
        [
          {
            id: 2,
            order: 2,
            title: "Технические вопросы",
            description: "Вопросы технического характера по игре Ex Machina.",
            topicsCount: 13,
            postsCount: 857,
            lastActiveTopicId: 2,
            lastActiveTopic: "Проблемы с игрой",
            latesPostTimeCreation: new Date("2016/9/22 12:53:09"),
            latesPostAutorId: 2,
            latesPostAutorName: "Bykawka",
            latesPostAutorGroupColor: "fbeab2"
          }
        ]
    };
    // execute
    let newState = forumReducer({allForums:  [
      {chapterId: preloadedForum.chapterId, forumList: preloadedForum.forums}
    ]}, action);
    // verify
    expect(newState).toEqual({allForums:  [
      {chapterId: preloadedForum.chapterId, forumList: preloadedForum.forums},
      {chapterId: action.chapterId, forumList: action.forums}
    ]});
  });
});

// export default function forumReducer(state = [], action) {
//     switch (action.type) {
//         case types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS:
//           if(state.allForums){
//             return Object.assign({}, state, {
//               allForums: [
//                 ...state.allForums,
//                 {chapterId: action.chapterId, forumList: action.forums}
//               ]
//             });
//           }
//           return Object.assign({}, state, {
//             allForums: [
//               {chapterId: action.chapterId, forumList: action.forums}
//             ]
//           });
//
//         default:
//             return state;
//     }
// }
