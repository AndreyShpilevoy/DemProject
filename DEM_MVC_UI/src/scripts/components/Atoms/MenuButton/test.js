/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import MenuButton from './index';

describe('MenuButton', () => {
  function setup() {
    return shallow(<MenuButton />);
  }

  it('should contain 1 "button" element',() => {
    const buttonElement = setup().find('button');
    expect(buttonElement.length).toBeTruthy();
  });
});
