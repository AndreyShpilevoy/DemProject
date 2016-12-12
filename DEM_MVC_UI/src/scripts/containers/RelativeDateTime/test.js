/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import {sharedFakeStore, validFakeStoreData} from 'store/__mocks__/sharedFakeStore';
import RelativeDateTime from './index';

jest.mock('../../services/dateTime/TransformDateTime', ()=>({
  GetRelative: ()=>('some time ago')
}));

describe('RelativeDateTime', () => {
  function setup(mockConfigId){
    let date = new Date();
    date.setMinutes(date.getMinutes() - 1);

    const props = {
      store: sharedFakeStore(mockConfigId),
      relativeDateTime: date
    };
    return shallow(<RelativeDateTime {...props}/>);
  }

  it('should get "currentLocale.locale" from "localeReducer" and recieve expected result', () => {
    expect(setup(1).prop('locale')).toEqual(validFakeStoreData.localeReducer.currentLocale.locale);
  });

  it('should get "currentLocale.locale" from "localeReducer" and recieve "eng"', () => {
    expect(setup(0).prop('locale')).toEqual('eng');
  });

  it('should create RelativeDateTime component with props.term equal to "some time ago"', () => {
    expect(setup(1).shallow().prop('spanContent')).toEqual('some time ago');
  });
});
