import * as types from 'enums/actionTypes';

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
