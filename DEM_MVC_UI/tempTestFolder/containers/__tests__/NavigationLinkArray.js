/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import NavigationLinkArray from "containers/NavigationLinkArray";
import * as mockActions from "actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, validFakeStoreData} from "store/__mocks__/sharedFakeStore";

describe('NavigationLinkArray', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions
    };
    return shallow(<NavigationLinkArray {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "navigationLinks" from "navigationLinkReducer" and recieve expected result', () => {
    expect(setup(1).prop('navigationLinkArray')).toEqual(validFakeStoreData.navigationLinkReducer.navigationLinks);
  });

  it('should find "NavigationLinkArray" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find("NavigationLinkArray").node.type.name).toEqual("NavigationLinkArray");
  });
});
