/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import NavigationLinkArray from "containers/NavigationLinkArray";
import * as mockActions from "actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "store/__mocks__/sharedFakeStore";

describe('NavigationLinkArray', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions
    };
    return shallow(<NavigationLinkArray {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "navigationLinks" from "navigationLinkReducer" and recieve expected result', () => {
    expect(setup(1).prop('navigationLinkArray')).toEqual(sharedFakeStoreData.navigationLinkReducer.navigationLinks);
  });

  it('should find "NavigationLinkArrayComponent" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find("NavigationLinkArrayComponent")).toBeTruthy();
  });
});
