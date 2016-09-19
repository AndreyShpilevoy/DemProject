import * as types from "./actionTypes";

function getTermTranslation(term){
  return {type: types.GET_TERM_TRANSLATION, term};
}

function getTermTranslationSuccess(term){
  return {type: types.GET_TERM_TRANSLATION_SUCCESS, term};
}

export {
  getTermTranslation,
  getTermTranslationSuccess
};
