/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import Title from "../Title";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";



describe('Title', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions
    };
    return shallow(<Title {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "breadcrumbArray" from "breadcrumbsReducer" and recieve expected result', () => {
    expect(setup(1).prop('breadcrumbArray')).toEqual(sharedFakeStoreData.breadcrumbsReducer.breadcrumbArray);
  });

  it('component should render "NULL"', () => {
    expect(setup(1).shallow().node).toEqual(null);
  });
});
