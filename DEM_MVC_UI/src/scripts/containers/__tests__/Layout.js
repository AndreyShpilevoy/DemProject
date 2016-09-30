/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import LayoutConnected, {Layout} from "../Layout";

const mockStore = configureMockStore();
const storeStateMock = {
  localeReducer:{
    currentLocale: {
      locale: "ru"
    }
  }
};
const mockActions = {
  getLocale: function(){}
};


describe('Layout', () => {
  function setup() {
    const props = {
      store: mockStore(storeStateMock),
      actions: mockActions
    };
    return shallow(<Layout {...props}/>, { lifecycleExperimental: true });
  }

  function setupConnected(valid) {
    const props = {
      store: valid ? mockStore(storeStateMock) : mockStore(),
    };
    return shallow(<LayoutConnected {...props}/>);
  }

  it('should call "componentDidMount" once',() => {
    sinon.spy(Layout.prototype, 'componentDidMount');
    setup();
    expect(Layout.prototype.componentDidMount.calledOnce).toBeTruthy();
  });

  it('should get "currentLocale.locale" from "localeReducer" and recieve expected result', () => {
    expect(setupConnected(true).prop('locale')).toEqual(storeStateMock.localeReducer.currentLocale.locale);
  });

  it('should get "currentLocale.locale" from "localeReducer" and recieve "undefined"', () => {
    expect(setupConnected(false).prop('locale')).toEqual(undefined);
  });
});
