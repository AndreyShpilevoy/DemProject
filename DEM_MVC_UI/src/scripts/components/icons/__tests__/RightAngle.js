/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import RightAngle from 'icons/RightAngle';

describe('RightAngle', () => {
  function setup() {
    return shallow(<RightAngle />);
  }

  it('should render top level svg with default class "icon-right-angle"',() => {
    const svgElement = setup().find('svg');
    expect(svgElement.hasClass('icon-right-angle')).toBeTruthy();
  });

  it('should render title with default "Right Angle"',() => {
    const titleElement = setup().find('title');
    expect(titleElement.prop('children')).toBe('Right Angle');
  });

  it('should render path with default class "icon-right-angle-path"',() => {
    const pathElement = setup().find('path');
    expect(pathElement.hasClass('icon-right-angle-path')).toBeTruthy();
  });
});
