import en from "./translationArrays/en";
import ru from "./translationArrays/ru";
import uk from "./translationArrays/uk";

import dateTimeDeclensionRuUa from "./dateTimeDeclensions/dateTimeDeclensionRuUa";
import dateTimeDeclensionFake from "./dateTimeDeclensions/dateTimeDeclensionFake";

const rootTranslations = [
  {locale: "en", translationArray: en, dateTimeDeclension: dateTimeDeclensionFake},
  {locale: "ru", translationArray: ru, dateTimeDeclension: dateTimeDeclensionRuUa},
  {locale: "uk", translationArray: uk, dateTimeDeclension: dateTimeDeclensionRuUa}
];

export default rootTranslations;
