import * as types from 'enums/actionTypes';

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
