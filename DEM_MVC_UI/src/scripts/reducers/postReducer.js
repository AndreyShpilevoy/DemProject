import * as types from 'enums/actionTypes';

export default function postReducer(state = [], action) {
  let localState = state;
    switch (action.type) {
        case types.GET_POSTS_BY_TOPIC_ID_SUCCESS:
          //if localState.allPosts already contains element with the same topicId - replace this element
          if(localState.allPosts && localState.allPosts.findIndex(post => post.topicId === action.topicId)!==-1) {
            let index = localState.allPosts.findIndex(post => post.topicId === action.topicId);//get index of element
            //replace element in localState without mutation
            localState = Object.assign({}, localState, {
              allPosts: [
                ...localState.allPosts.slice(0, index),
                {topicId: action.topicId, postArray: action.posts},
                ...localState.allPosts.slice(index+1),
              ]
            });
          }
          //if localState.allPosts is not empty but dont contains  element with the same chapterId - add new element to array
          else if(state.allPosts){
            localState = Object.assign({}, state, {allPosts: [...state.allPosts, {topicId: action.topicId, postArray: action.posts}]});
          }
          //if localState.allPosts is not initilized - initialize and add new element to array
          else {
            localState = Object.assign({}, state, {allPosts: [{topicId: action.topicId, postArray: action.posts}]});
          }
          break;
      }
      return localState;
}
