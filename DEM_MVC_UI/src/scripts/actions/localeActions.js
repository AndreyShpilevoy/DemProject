import * as types from "./actionTypes";

function getLocale(){
  return {type: types.GET_LOCALE};
}

function getLocaleSuccess(locale){
  return {type: types.GET_LOCALE_SUCCESS, locale};
}

export {
  getLocale,
  getLocaleSuccess
};
