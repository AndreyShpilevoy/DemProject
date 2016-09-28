/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import NavigationLinkItem from "../NavigationLinkItem";

describe('NavigationLinkItem', () => {
  function setup() {
    const props = {
      navigationLinkItem: {id: 1, title: "testNavigationLink", href: "http://testNavigationHref", order: 0}
    };
    return shallow(<NavigationLinkItem {...props}/>);
  }

  it('should render top level li with className nav-list-item',() => {
    const liElement = setup().find('li');
    expect(liElement.hasClass("nav-list-item")).toBeTruthy();
  });

  it('should render Link component with className nav-link',() => {
    const linkComponent = setup().find('Link');
    expect(linkComponent.hasClass("nav-link")).toBeTruthy();
  });

  it('Link component has title equel to "testNavigationLink"',() => {
    const linkComponent = setup().find('Link');
    expect(linkComponent.prop("children")).toBe('testNavigationLink');
  });

  it('Link component has prop "to" equel to "http://testNavigationHref"',() => {
    const linkComponent = setup().find('Link');
    expect(linkComponent.prop("to")).toBe("http://testNavigationHref");
  });

  it('should render div for Navigation Link Separator with className nav-link-separator',() => {
    const divElement = setup().find('div');
    expect(divElement.hasClass("nav-link-separator")).toBeTruthy();
  });

});
