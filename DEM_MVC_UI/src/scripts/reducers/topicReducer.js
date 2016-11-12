import * as types from 'enums/actionTypes';

export default function topicReducer(state = [], action) {
  let localState = state;
  switch (action.type) {
      case types.GET_TOPICS_BY_FORUM_ID_SUCCESS:
        //if localState.allTopics already contains element with the same forumId - replace this element
        if(localState.allTopics && localState.allTopics.findIndex(topic => topic.forumId === action.forumId)!==-1) {
          let index = localState.allTopics.findIndex(topic => topic.forumId === action.forumId);//get index of element
          //replace element in localState without mutation
          localState = Object.assign({}, localState, {
            allTopics: [
              ...localState.allTopics.slice(0, index),
              {forumId: action.forumId, topicArray: action.topics},
              ...localState.allTopics.slice(index+1),
            ]
          });
        }
        //if localState.allTopics is not empty but dont contains  element with the same chapterId - add new element to array
        else if(state.allTopics){
          localState = Object.assign({}, state, {allTopics: [...state.allTopics, {forumId: action.forumId, topicArray: action.topics}]});
        }
        //if localState.allTopics is not initilized - initialize and add new element to array
        else {
          localState = Object.assign({}, state, {allTopics: [{forumId: action.forumId, topicArray: action.topics}]});
        }
        break;
    }
    return localState;
    // switch (action.type) {
    //     case types.GET_TOPICS_BY_FORUM_ID_SUCCESS:
    //       if(state.allTopics){
    //         return Object.assign({}, state, {
    //           allTopics: [
    //             ...state.allTopics,
    //             {forumId: action.forumId, topicArray: action.topics}
    //           ]
    //         });
    //       }
    //       return Object.assign({}, state, {
    //         allTopics: [
    //           {forumId: action.forumId, topicArray: action.topics}
    //         ]
    //       });
    //
    //     default:
    //         return state;
    // }
}
