import _ from "lodash";
import rootTranslations from "../translations/rootTranslations";

class TermTranslation {
  static getTermTranslation(term, locale) {
    let result = "";
      if (term) {
        let localeObject = _.find(rootTranslations, {locale: locale});
        if (localeObject) {
          let translation = _.find(localeObject.translationArray, {id: term.id});
          if (translation) {
            result = translation.value;
          } else {
            result = term.value;
          }
        } else {
          result = term.value;
        }
      }
    return result;
  }
}

export default TermTranslation;
