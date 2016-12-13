/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import IconArrowLeft from './index';

describe('IconArrowLeft', () => {
  function setup() {
    return shallow(<IconArrowLeft />);
  }

  it('should render top level svg with default class "icon-arrow-left"',() => {
    const svgElement = setup().find('svg');
    expect(svgElement.hasClass('icon-arrow-left')).toBeTruthy();
  });

  it('should render title with default "Arrow Left"',() => {
    const titleElement = setup().find('title');
    expect(titleElement.prop('children')).toBe('Arrow Left');
  });

  it('should render path with default class "icon-arrow-left-path"',() => {
    const pathElement = setup().find('path');
    expect(pathElement.hasClass('icon-arrow-left-path')).toBeTruthy();
  });
});
