/*eslint no-undef: "off"*/

import * as localeSagas from "sagas/localeSagas";
import LocaleApi from "api/__mocks__/LocaleApi";
import CheckObject from "testHelpers/CheckObject";

describe('localeSagas', () => {
  it('getLocaleGenerator first yeald should return TAKE pattern "GET_LOCALE"', () => {
    const getLocaleGenerator = localeSagas.getLocale();

    expect(getLocaleGenerator.next().value.TAKE.pattern)
      .toEqual('GET_LOCALE');
  });

  it('getLocaleGenerator second yeald should return CALL to function "LocaleApi.getLocale"', () => {
    const getLocaleGenerator = localeSagas.getLocale();

    getLocaleGenerator.next();

    expect(getLocaleGenerator.next().value.CALL.fn)
      .toEqual(LocaleApi.getLocale);
  });

  it('getLocaleGenerator third yeald should return PUT action.type "GET_LOCALE_SUCCESS"', () => {
    const getLocaleGenerator = localeSagas.getLocale();
    const currentLocale = LocaleApi.getLocale();

    getLocaleGenerator.next();
    getLocaleGenerator.next();

    expect(getLocaleGenerator.next(currentLocale).value.PUT.action.type)
      .toEqual('GET_LOCALE_SUCCESS');
  });

  it('getLocaleGenerator third yeald should return PUT action.currentLocale that is a Promise', () => {
    const getLocaleGenerator = localeSagas.getLocale();
    const currentLocale = LocaleApi.getLocale();

    getLocaleGenerator.next();
    getLocaleGenerator.next();

    expect(CheckObject.IsPromise(getLocaleGenerator.next(currentLocale).value.PUT.action.currentLocale))
      .toBeTruthy();
  });
});
