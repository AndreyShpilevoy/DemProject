import en from "./translationArrays/en";
import ru from "./translationArrays/ru";
import ua from "./translationArrays/ua";

import dateTimeDeclensionRuUa from "./dateTimeDeclensions/dateTimeDeclensionRuUa";
import dateTimeDeclensionEn from "./dateTimeDeclensions/dateTimeDeclensionEn";
//more date related translations - https://github.com/nmn/react-timeago/tree/master/src/language-strings

const rootTranslations = [
  {locale: "en", translationArray: en, dateTimeDeclension: dateTimeDeclensionEn},
  {locale: "ru", translationArray: ru, dateTimeDeclension: dateTimeDeclensionRuUa},
  {locale: "ua", translationArray: ua, dateTimeDeclension: dateTimeDeclensionRuUa}
];

export default rootTranslations;
