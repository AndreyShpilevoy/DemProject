import * as types from "./actionTypes";

function getSocialMediaLinks(){
  return {type: types.GET_SOCIALMEDIALINKS};
}

function getSocialMediaLinksSuccess(socialMediaLinks){
  return {type: types.GET_SOCIALMEDIALINKS_SUCCESS, socialMediaLinks};
}

export {
  getSocialMediaLinks,
  getSocialMediaLinksSuccess
};
