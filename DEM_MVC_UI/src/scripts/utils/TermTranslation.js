import _ from "lodash";
import rootTranslations from "translations/rootTranslations";

class TermTranslation {
  getTermTranslation(term, locale) {
    let result;
      if (term && locale) {
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
      } else if (term) {
        result = term.value;
      }
    return result;
  }
  getDateTimeDeclension(locale) {
    let localeObject = _.find(rootTranslations, {locale: locale});
    return localeObject ?  localeObject.dateTimeDeclension : null;
  }
}

export default new TermTranslation();
