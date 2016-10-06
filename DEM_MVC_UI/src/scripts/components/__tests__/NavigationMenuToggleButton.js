/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import {NavigationMenuToggleButton} from "../_all";

describe('NavigationMenuToggleButton', () => {
  function setup() {
    return shallow(<NavigationMenuToggleButton />);
  }

  it('should render top level div with className "navigation-menu-toggle-button-container"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass("navigation-menu-toggle-button-container")).toBeTruthy();
  });

  it('should contain 1 "Link" element',() => {
    const buttonElement = setup().find('button');
    expect(buttonElement.hasClass("navigation-toggler-button")).toBeTruthy();
  });
});
