/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */


import React from 'react';
import {shallow} from 'enzyme';
import Header from 'components/Header';

jest.mock('../../services/domScripts/ToggleClass');
jest.mock('../../services/domScripts/ShrinkingHeader');


describe('Header', () => {
  function setup() {
    return shallow(<Header />, { lifecycleExperimental: true });
  }

  it('should render top level div with className "navbar-fixed-top"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass('navbar-fixed-top')).toBeTruthy();
  });

  it('should contain 1 Logotype element',() => {
    const navigationLinkLogoElement = setup().find('Logotype');
    expect(navigationLinkLogoElement.length).toEqual(1);
  });

  it('should contain 1 NavigationMenuToggleButton element',() => {
    const navigationMenuToggleButtonElement = setup().find('NavigationMenuToggleButton');
    expect(navigationMenuToggleButtonElement.length).toEqual(1);
  });

  it('should contain 1 NavigationLinkArray element',() => {
    const NavigationLinkArrayElement = setup().find('Connect(NavigationLinkArray)');
    expect(NavigationLinkArrayElement.length).toEqual(1);
  });
});
