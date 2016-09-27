/*eslint no-undef: "off"*/

import { call, put, take } from "redux-saga/effects";
import * as localeSagas from "../localeSagas";
import LocaleApi from "../../api/__mocks__/LocaleApi";
import * as localeActions from "../../actions/localeActions";

describe('localeSagas', () => {
  it('getLocale generator should pass on three steps', () => {
    const socialMediaLinkSagaGenerator = localeSagas.getLocale();
    const action = {
      type: "GET_LOCALE"
    };
    const locale = LocaleApi.getLocale();

    expect(socialMediaLinkSagaGenerator.next(action).value)
      .toEqual(take(action.type));

    expect(socialMediaLinkSagaGenerator.next().value)
      .toEqual(call(LocaleApi.getLocale));

    expect(socialMediaLinkSagaGenerator.next(locale).value)
      .toEqual(put(localeActions.getLocaleSuccess(locale)));
  });
});
