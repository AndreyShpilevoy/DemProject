/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import TermItem from "containers/TermItem";
import {sharedFakeStore, sharedFakeStoreData} from "store/__mocks__/sharedFakeStore";

jest.mock("../../utils/TermTranslation", ()=>({
  getTermTranslation: ()=>("TestTerm")
}));

describe('TermItem', () => {
  function setup(mockConfigId){
    const props = {
      store: sharedFakeStore(mockConfigId),
      term: {
        id: 1,
        value: "TestTermDefault"
      }
    };
    return shallow(<TermItem {...props}/>);
  }

  it('should get "currentLocale.locale" from "localeReducer" and recieve expected result', () => {
    expect(setup(1).prop('locale')).toEqual(sharedFakeStoreData.localeReducer.currentLocale.locale);
  });

  it('should get "currentLocale.locale" from "localeReducer" and recieve "undefined"', () => {
    expect(setup(0).prop('locale')).toEqual(undefined);
  });

  it('should create TermItem component with props.term equal to "TestTerm"', () => {
    expect(setup(1).shallow().prop('spanContent')).toEqual("TestTerm");
  });

  it('should create TermItem component with props.term equal to "null"', () => {
    expect(setup(0).shallow().prop('spanContent')).toEqual(null);
  });
});
