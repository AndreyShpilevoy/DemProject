import * as types from "./actionTypes";

function getLocale(){
  return {type: types.GET_LOCALE};
}

function getLocaleSuccess(currentLocale){
  return {type: types.GET_LOCALE_SUCCESS, currentLocale};
}

export {
  getLocale,
  getLocaleSuccess
};
