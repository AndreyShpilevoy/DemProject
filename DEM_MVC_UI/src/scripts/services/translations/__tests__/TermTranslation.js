/*eslint no-undef: "off"*/

import TermTranslation from "services/translations/TermTranslation";

describe('TermTranslation', () => {

  it('getDateTimeDeclension should return not null',() => {
    let result = TermTranslation.getDateTimeDeclension("en");
    expect(result).toBeTruthy();
  });

  it('getDateTimeDeclension should return null',() => {
    let result = TermTranslation.getDateTimeDeclension("fake local");
    expect(result).toBeNull();
  });

  it('getTermTranslation should return default value with fake locale',() => {
    let term = {id: 1, value: 'Topics'};
    let result = TermTranslation.getTermTranslation(term, "fake local");
    expect(result).toBe(term.value);
  });

  it('getTermTranslation should return default value with undefined locale',() => {
    let term = {id: 1, value: 'Topics'};
    let result = TermTranslation.getTermTranslation(term, undefined);
    expect(result).toBe(term.value);
  });

  it('getTermTranslation should return default value if translation is wrong',() => {
    let term = {id: -1, value: 'Topics'};
    let result = TermTranslation.getTermTranslation(term, "en");
    expect(result).toBe(term.value);
  });

  it('getTermTranslation should return ru translated value',() => {
    let term = {id: 1, value: 'Topics'};
    let result = TermTranslation.getTermTranslation(term, "ru");
    expect(result).toBe("Тем");
  });

  it('getTermTranslation should return undefined',() => {
    let result = TermTranslation.getTermTranslation(undefined, "ru");
    expect(result).toBeUndefined();
  });

});
