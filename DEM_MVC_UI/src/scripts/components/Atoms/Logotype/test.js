/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import Logotype from './index';

describe('Logotype', () => {
  function setup() {
    return shallow(<Logotype />);
  }

  it('should contain 1 "Link" element',() => {
    const linkElement = setup().find('Link');
    expect(linkElement.length).toEqual(1);
  });
});
