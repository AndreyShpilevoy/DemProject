import en from "translations/translationArrays/en";
import ru from "translations/translationArrays/ru";
import ua from "translations/translationArrays/ua";

import dateTimeDeclensionRuUa from "translations/dateTimeDeclensions/dateTimeDeclensionRuUa";
import dateTimeDeclensionEn from "translations/dateTimeDeclensions/dateTimeDeclensionEn";
//more date related translations - https://github.com/nmn/react-timeago/tree/master/src/language-strings

const rootTranslations = [
  {locale: "en", translationArray: en, dateTimeDeclension: dateTimeDeclensionEn},
  {locale: "ru", translationArray: ru, dateTimeDeclension: dateTimeDeclensionRuUa},
  {locale: "ua", translationArray: ua, dateTimeDeclension: dateTimeDeclensionRuUa}
];

export default rootTranslations;
