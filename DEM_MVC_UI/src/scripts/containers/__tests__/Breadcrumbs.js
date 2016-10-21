/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import Breadcrumbs from "../Breadcrumbs";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";



describe('Breadcrumbs', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions
    };
    return shallow(<Breadcrumbs {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "breadcrumbs" from "breadcrumbsReducer" and recieve expected result', () => {
    expect(setup(1).prop('breadcrumbArray')).toEqual(sharedFakeStoreData.breadcrumbsReducer.breadcrumbArray);
  });

  it('should find "BreadcrumbArray" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find("BreadcrumbArray")).toBeTruthy();
  });
});