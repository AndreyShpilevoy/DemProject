import _ from "lodash";
import en from "services/translations/translationArrays/en";
import ru from "services/translations/translationArrays/ru";
import ua from "services/translations/translationArrays/ua";
import dateTimeDeclensionRuUa from "services/translations/dateTimeDeclensions/dateTimeDeclensionRuUa";
import dateTimeDeclensionEn from "services/translations/dateTimeDeclensions/dateTimeDeclensionEn";
//more date related translations - https://github.com/nmn/react-timeago/tree/master/src/language-strings

class TermTranslation {
  constructor() {
    this.translations = [
      {locale: "en", translationArray: en, dateTimeDeclension: dateTimeDeclensionEn},
      {locale: "ru", translationArray: ru, dateTimeDeclension: dateTimeDeclensionRuUa},
      {locale: "ua", translationArray: ua, dateTimeDeclension: dateTimeDeclensionRuUa}
    ];
  }
  getTermTranslation(term, locale) {
    let result;
      if (term && locale) {
        let localeObject = _.find(this.translations, {locale: locale});
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
    let localeObject = _.find(this.translations, {locale: locale});
    return localeObject ?  localeObject.dateTimeDeclension : null;
  }
}

export default new TermTranslation();
