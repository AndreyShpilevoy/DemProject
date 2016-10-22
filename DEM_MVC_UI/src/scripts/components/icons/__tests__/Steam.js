/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import Steam from "../Steam";

describe('Steam', () => {
  function setup() {
    return shallow(<Steam />);
  }

  it('should render top level svg with default class "icon-steam"',() => {
    const svgElement = setup().find('svg');
    expect(svgElement.hasClass("icon-steam")).toBeTruthy();
  });

  it('should render title with default "Steam"',() => {
    const titleElement = setup().find('title');
    expect(titleElement.prop("children")).toBe('Steam');
  });

  it('should render two "g" elements',() => {
    const pathElement = setup().find('g');
    expect(pathElement.length).toBe(2);
  });

  it('should render path with default class "icon-steam-path-bacground" and contains in g element',() => {
    const pathElement = setup().find('path').first();
    expect(pathElement.hasClass("icon-steam-path-bacground")).toBeTruthy();
    expect(pathElement.parent().is('g')).toBeTruthy();
  });

  it('should render path with default class "icon-steam-path-image" and contains in g element',() => {
    const pathElement = setup().find('path').last();
    expect(pathElement.hasClass("icon-steam-path-image")).toBeTruthy();
    expect(pathElement.parent().is('g')).toBeTruthy();
  });
});
