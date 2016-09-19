import _ from "lodash";
import rootTranslations from "../translations/rootTranslations";

class termTranslationApi {
  static getTermTranslation(term, locale) {
    let result = "";
      if (term) {
        let localeObject = _.find(rootTranslations, 'locale', locale);
        if (localeObject) {
          let translation = _.find(localeObject.translationArray.default, 'id', term.id);
          if (translation) {
            result = translation.value;
          } else {
            result = term.value;
          }
        } else {
          result = term.value;
        }
      }
    return {id: term.id, value: result};
  }
}

export default termTranslationApi;
