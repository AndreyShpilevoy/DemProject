import * as types from "enums/actionTypes";

export default function forumReducer(state = [], action) {
  let localState = state;
  switch (action.type) {
    case types.GET_FORUMS_BY_CHAPTER_ID_SUCCESS:
      //if localState.allForums already contains element with the same chapterId - replace this element
      if(localState.allForums && localState.allForums.findIndex(forum => forum.chapterId === action.chapterId)!==-1) {
        let index = localState.allForums.findIndex(forum => forum.chapterId === action.chapterId);//get index of element
        localState.allForums.splice(index, 1, {chapterId: action.chapterId, forumArray: action.forums});//replace element in localState
      }
      //if localState.allForums is not empty but dont contains  element with the same chapterId - add new element to array
      else if(state.allForums) {
        return Object.assign({}, state, {
          allForums: [...state.allForums, {chapterId: action.chapterId, forumArray: action.forums}]
        });
      }
      //if localState.allForums is not initilized - initialize and add new element to array
      else {
        return Object.assign({}, state, {
          allForums: [{chapterId: action.chapterId, forumArray: action.forums}]
        });
      }
      break;
  }
  return localState;
}
