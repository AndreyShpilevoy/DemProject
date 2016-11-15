/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import TermItem from "containers/TermItem";
import {sharedFakeStore, validFakeStoreData} from "store/__mocks__/sharedFakeStore";

jest.mock("../../services/translations/TermTranslation", ()=>({
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
    expect(setup(1).prop('locale')).toEqual(validFakeStoreData.localeReducer.currentLocale.locale);
  });

  it('should get "currentLocale.locale" from "localeReducer" and recieve "eng"', () => {
    expect(setup(0).prop('locale')).toEqual("eng");
  });

  it('should create TermItem component with props.term equal to "TestTerm"', () => {
    expect(setup(1).shallow().prop('spanContent')).toEqual("TestTerm");
  });
});
