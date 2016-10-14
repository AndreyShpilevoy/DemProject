/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import NavigationLinkArray from "../NavigationLinkArray";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

describe('NavigationLinkArray', () => {
  function setup() {
    const props = {
      store: sharedFakeStore(),
      actions: mockActions
    };
    return shallow(<NavigationLinkArray {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "navigationLinks" from "navigationLinkReducer" and recieve expected result', () => {
    expect(setup().prop('navigationLinkArray')).toEqual(sharedFakeStoreData.navigationLinkReducer.navigationLinks);
  });

  it('should find "NavigationLinkArrayComponent" component', () => {
    const divElement = setup().shallow();
    expect(divElement.find("NavigationLinkArrayComponent")).toBeTruthy();
  });
});
