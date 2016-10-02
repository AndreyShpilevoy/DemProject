/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */


import React from 'react';
import {shallow} from 'enzyme';
import Header from "../Header";

jest.mock('../../utils/_all');

describe('Header', () => {
  function setup() {
    return shallow(<Header />, { lifecycleExperimental: true });
  }

  it('should render top level div with className "navbar-fixed-top"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass("navbar-fixed-top")).toBeTruthy();
  });

  it('should contain 1 NavigationLinkLogo element',() => {
    const navigationLinkLogoElement = setup().find('NavigationLinkLogo');
    expect(navigationLinkLogoElement.length).toEqual(1);
  });

  it('should contain 1 NavigationMenuToggleButton element',() => {
    const navigationMenuToggleButtonElement = setup().find('NavigationMenuToggleButton');
    expect(navigationMenuToggleButtonElement.length).toEqual(1);
  });

  it('should contain 1 NavigationLinkList element',() => {
    const NavigationLinkListElement = setup().find('Connect(NavigationLinkList)');
    expect(NavigationLinkListElement.length).toEqual(1);
  });
});
