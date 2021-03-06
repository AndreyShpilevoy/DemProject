/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import * as mockActions from 'actions/__mocks__/sharedFakeActions';
import {sharedFakeStore, validFakeStoreData} from 'store/__mocks__/sharedFakeStore';
import Title from './index';



describe('Title', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions
    };
    return shallow(<Title {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "breadcrumbArray" from "breadcrumbsReducer" and recieve expected result', () => {
    expect(setup(1).prop('breadcrumbArray')).toEqual(validFakeStoreData.breadcrumbsReducer.breadcrumbArray);
  });

  it('component should render "NULL"', () => {
    expect(setup(1).shallow().node).toEqual(null);
  });
});
