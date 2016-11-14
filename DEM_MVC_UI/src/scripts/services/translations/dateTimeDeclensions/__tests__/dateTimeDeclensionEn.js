/*eslint no-undef: 'off'*/

import dateTimeDeclensionEn from 'services/translations/dateTimeDeclensions/dateTimeDeclensionEn';

describe('dateTimeDeclensionEn', () => {

  it('should return "singleForm"',() => {
    let result = dateTimeDeclensionEn(1,'firstForm','secondForm','trirdForm','singleForm');
    expect(result).toBe('singleForm');
  });

  it('should return "2 secondForm"',() => {
    let result = dateTimeDeclensionEn(2,'firstForm','secondForm','trirdForm','singleForm');
    expect(result).toBe('2 secondForm');
  });

});
