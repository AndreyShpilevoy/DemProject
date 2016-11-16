/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import Logotype from 'components/Logotype';

describe('Logotype', () => {
  function setup() {
    return shallow(<Logotype />);
  }

  it('should render top level div with className "navbar-logo-container"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass('navbar-logo-container')).toBeTruthy();
  });

  it('should contain 1 "Link" element',() => {
    const linkElement = setup().find('Link');
    expect(linkElement.length).toEqual(1);
  });
});
