/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import Layout from "../Layout";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";



describe('Layout', () => {
  function setup(valid) {
    const props = {
      store: valid ? sharedFakeStore(true) : sharedFakeStore(false),
      actions: mockActions
    };
    return shallow(<Layout {...props}/>, { lifecycleExperimental: true });
  }

  it('should call "componentDidMount" once',() => {
    sinon.spy(Layout.prototype, 'componentDidMount');
    setup().shallow({ lifecycleExperimental: true });
    expect(Layout.prototype.componentDidMount.calledOnce).toBeTruthy();
  });

  it('should get "currentLocale.locale" from "localeReducer" and recieve expected result', () => {
    expect(setup(true).prop('locale')).toEqual(sharedFakeStoreData.localeReducer.currentLocale.locale);
  });

  it('should get "currentLocale.locale" from "localeReducer" and recieve "undefined"', () => {
    expect(setup(false).prop('locale')).toEqual(undefined);
  });
});
