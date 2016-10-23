/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import Vk from "icons/Vk";

describe('Vk', () => {
  function setup() {
    return shallow(<Vk />);
  }

  it('should render top level svg with default class "icon-vk"',() => {
    const svgElement = setup().find('svg');
    expect(svgElement.hasClass("icon-vk")).toBeTruthy();
  });

  it('should render title with default "VK"',() => {
    const titleElement = setup().find('title');
    expect(titleElement.prop("children")).toBe('VK');
  });

  it('should render one "g" elements',() => {
    const pathElement = setup().find('g');
    expect(pathElement.length).toBe(1);
  });

  it('should render path with default class "icon-vk-path-bacground" and contains in g element',() => {
    const pathElement = setup().find('path').first();
    expect(pathElement.hasClass("icon-vk-path-bacground")).toBeTruthy();
    expect(pathElement.parent().is('g')).toBeTruthy();
  });

  it('should render path with default class "icon-vk-path-image" and contains in g element',() => {
    const pathElement = setup().find('path').last();
    expect(pathElement.hasClass("icon-vk-path-image")).toBeTruthy();
    expect(pathElement.parent().is('g')).toBeTruthy();
  });
});
