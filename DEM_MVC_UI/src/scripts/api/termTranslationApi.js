import _ from "lodash";
import rootTranslations from "../translations/rootTranslations";

class termTranslationApi {
  static getTermTranslation(term, locale) {
    let result = "";
      if (term) {
        let translationArray = _.pick(rootTranslations, [locale]);
        if (translationArray) {
          let translation = _.pick(translationArray, [term.key]);
          if (translation) {
            result = translation.value;
          } else {
            result = term.value;
          }
        } else {
          result = term.value;
        }
      }
    return new Promise((resolve)=>{
      resolve(Object.assign([], result));
    });
  }
}

export default termTranslationApi;
