import _ from "lodash";
import rootTranslations from "../translations/rootTranslations";

class TermTranslation {
  static getTermTranslation(term, locale) {
    let result;
      if (term) {
        let localeObject = _.find(rootTranslations, {locale: locale});
        if (localeObject) {
          let translation = _.find(localeObject.translationArray, {id: term.id});
          if (translation) {
            result = translation.value;
          }
        }
      }
    return result ? result : term.value;
  }
  static getDateTimeDeclension(locale) {
    let localeObject = _.find(rootTranslations, {locale: locale});
    return localeObject ?  localeObject.dateTimeDeclension : null;
  }
}

export default TermTranslation;
