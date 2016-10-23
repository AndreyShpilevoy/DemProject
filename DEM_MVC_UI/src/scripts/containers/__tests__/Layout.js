/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import Layout from "containers/Layout";
import * as mockActions from "actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "store/__mocks__/sharedFakeStore";



describe('Layout', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions
    };
    return shallow(<Layout {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "currentLocale.locale" from "localeReducer" and recieve expected result', () => {
    expect(setup(1).prop('locale')).toEqual(sharedFakeStoreData.localeReducer.currentLocale.locale);
  });

  it('should get "currentLocale.locale" from "localeReducer" and recieve "undefined"', () => {
    expect(setup(0).prop('locale')).toEqual(undefined);
  });

  it('should find "LayoutComponent" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find("LayoutComponent")).toBeTruthy();
  });
});
