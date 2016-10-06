/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as localeActions from "../localeActions";
import {locale} from "../../api/__fakeData__/_all";


describe('localeActions', () => {
  it('should create an action to get locale', () => {
    const expectedAction = {type: types.GET_LOCALE};
    expect(localeActions.getLocale()).toEqual(expectedAction);
  });

  it('should create an action to get locale on success', () => {
    const currentLocale = locale;
    const expectedAction = {
      type: types.GET_LOCALE_SUCCESS,
      currentLocale
    };
    expect(localeActions.getLocaleSuccess(currentLocale)).toEqual(expectedAction);
  });
});
