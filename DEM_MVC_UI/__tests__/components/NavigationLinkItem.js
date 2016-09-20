/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import NavigationLinkItem from "../../src/scripts/components/NavigationLinkItem";

describe('NavigationLinkItem', () => {
  function setup() {
    const props = {
      navigationLinkItem: {id: 1, title: "testNavigationLink", href: "http://testNavigationHref", order: 0}
    };
    return shallow(<NavigationLinkItem {...props}/>);
  }

  it('should render top level li',() => {
    const liElement = setup().find('li');
    expect(liElement.length).toBe(1);
    expect(liElement.hasClass("nav-list-item")).toBeTruthy();
  });

  it('should render Link component',() => {
    const linkComponent = setup().find('Link');
    expect(linkComponent.length).toBe(1);
    expect(linkComponent.hasClass("nav-link")).toBeTruthy();
  });

  it('Link component has title equel to "testNavigationLink"',() => {
    const linkComponent = setup().find('Link');
    expect(linkComponent.length).toBe(1);
    expect(linkComponent.prop("children")).toBe('testNavigationLink');
  });

  it('should render div for Navigation Link Separator',() => {
    const divElement = setup().find('div');
    expect(divElement.length).toBe(1);
    expect(divElement.hasClass("nav-link-separator")).toBeTruthy();
  });

});
