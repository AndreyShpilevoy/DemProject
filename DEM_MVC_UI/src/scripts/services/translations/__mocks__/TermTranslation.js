/*eslint no-unused-vars: "off"*/
/*eslint no-undef: "off"*/

const TermTranslation = jest.genMockFromModule('../TermTranslation');

function getTermTranslation (term, locale) {
  return term.value;
}

function getDateTimeDeclension (locale) {
  if(locale === 'en'){
    return (
      function (number, firstForm, secondForm, trirdForm, singleForm) {
        return `${singleForm}`;
      }
    );
  }
  return undefined;
}

TermTranslation.getTermTranslation = getTermTranslation;
TermTranslation.getDateTimeDeclension = getDateTimeDeclension;

export default TermTranslation;
