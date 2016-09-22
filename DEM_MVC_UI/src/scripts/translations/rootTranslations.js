import en from "./translationArrays/en";
import ru from "./translationArrays/ru";
import uk from "./translationArrays/uk";

import dateTimeDeclensionRuUa from "./dateTimeDeclensions/dateTimeDeclensionRuUa";
import dateTimeDeclensionFake from "./dateTimeDeclensions/dateTimeDeclensionFake";
//more date related translations - https://github.com/nmn/react-timeago/tree/master/src/language-strings

const rootTranslations = [
  {locale: "en", translationArray: en, dateTimeDeclension: dateTimeDeclensionFake},
  {locale: "ru", translationArray: ru, dateTimeDeclension: dateTimeDeclensionRuUa},
  {locale: "uk", translationArray: uk, dateTimeDeclension: dateTimeDeclensionRuUa}
];

export default rootTranslations;
