import * as types from "actions/actionTypes";

function getNavigationLinks(){
  return {type: types.GET_NAVIGATIONLINKS};
}

function getNavigationLinksSuccess(navigationLinks){
  return {type: types.GET_NAVIGATIONLINKS_SUCCESS, navigationLinks};
}

export {
  getNavigationLinks,
  getNavigationLinksSuccess
};
