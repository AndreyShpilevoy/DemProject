/*eslint no-undef: 'off'*/

import * as localeSagas from 'sagas/localeSagas';
import LocaleApi from 'api/__mocks__/LocaleApi';
import CheckObject from 'testHelpers/CheckObject';

describe('localeSagas', () => {
  it('getLocale first yeald should return TAKE pattern "GET_LOCALE"', () => {
    const generator = localeSagas.getLocale();

    expect(generator.next().value.TAKE.pattern).toEqual('GET_LOCALE');
  });

  it('getLocale second yeald should return CALL to function "LocaleApi.getLocale"', () => {
    const generator = localeSagas.getLocale();

    generator.next();
    expect(generator.next().value.CALL.fn).toEqual(LocaleApi.getLocale);
  });

  it('getLocale third yeald should return PUT action.type "GET_LOCALE_SUCCESS"', () => {
    const generator = localeSagas.getLocale();
    const currentLocale = LocaleApi.getLocale();

    generator.next();
    generator.next();
    expect(generator.next(currentLocale).value.PUT.action.type).toEqual('GET_LOCALE_SUCCESS');
  });

  it('getLocale third yeald should return PUT action.currentLocale that is a Promise', () => {
    const generator = localeSagas.getLocale();
    const currentLocale = LocaleApi.getLocale();

    generator.next();
    generator.next();
    expect(CheckObject.IsPromise(generator.next(currentLocale).value.PUT.action.currentLocale)).toBeTruthy();
  });
});
