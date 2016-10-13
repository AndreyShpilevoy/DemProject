/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import TermItem from "../TermItem";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

jest.mock("../../utils/TermTranslation", ()=>({
  getTermTranslation: ()=>("TestTerm")
}));

describe('TermItem', () => {
  function setup(valid){
    const props = {
      store: valid ? sharedFakeStore(true) : sharedFakeStore(false),
      term: {
        id: 1,
        value: "TestTermDefault"
      }
    };
    return shallow(<TermItem {...props}/>);
  }

  it('should get "currentLocale.locale" from "localeReducer" and recieve expected result', () => {
    expect(setup(true).prop('locale')).toEqual(sharedFakeStoreData.localeReducer.currentLocale.locale);
  });

  it('should get "currentLocale.locale" from "localeReducer" and recieve "undefined"', () => {
    expect(setup(false).prop('locale')).toEqual(undefined);
  });

  it('should create TermItem component with props.term equal to "TestTerm"', () => {
    expect(setup(true).shallow().prop('term')).toEqual("TestTerm");
  });

  it('should create TermItem component with props.term equal to "null"', () => {
    expect(setup(false).shallow().prop('term')).toEqual(null);
  });
});
