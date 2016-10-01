/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */
/* eslint import/imports-first: "off" */

jest.mock("../../utils/_all", ()=>({
  TransformDateTime: {
    GetRelative: ()=>("some time ago")
  }
}));

import React from 'react';
import {shallow} from 'enzyme';
import RelativeDateTimeConnected from "../RelativeDateTime";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

describe('RelativeDateTime', () => {
  function setup(valid){
    let date = new Date();
    date.setMinutes(date.getMinutes() - 1);

    const props = {
      store: valid ? sharedFakeStore(true) : sharedFakeStore(false),
      relativeDateTime: date
    };
    return shallow(<RelativeDateTimeConnected {...props}/>);
  }

  it('should get "currentLocale.locale" from "localeReducer" and recieve expected result', () => {
    expect(setup(true).prop('locale')).toEqual(sharedFakeStoreData.localeReducer.currentLocale.locale);
  });

  it('should get "currentLocale.locale" from "localeReducer" and recieve "undefined"', () => {
    expect(setup(false).prop('locale')).toEqual(undefined);
  });

  it('should create RelativeDateTime component with props.term equal to "some time ago"', () => {
    expect(setup(true).shallow().prop('relativeDateTime')).toEqual("some time ago");
  });

  it('should create RelativeDateTime component with props.term equal to "null"', () => {
    expect(setup(false).shallow().prop('relativeDateTime')).toEqual(null);
  });
});
