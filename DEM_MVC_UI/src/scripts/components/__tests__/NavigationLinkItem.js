/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import NavigationLinkItem from "../NavigationLinkItem";
import navigationLinks from "../../api/__fakeData__/navigationLinks";

describe('NavigationLinkItem', () => {
  function setup() {
    const props = {
      navigationLinkItem: navigationLinks[0]
    };
    return shallow(<NavigationLinkItem {...props}/>);
  }

  it('should render top level li with className nav-array-item',() => {
    const liElement = setup().find('li');
    expect(liElement.hasClass("nav-array-item")).toBeTruthy();
  });

  it('should render Link component with className nav-link',() => {
    const linkComponent = setup().find('Link');
    expect(linkComponent.hasClass("nav-link")).toBeTruthy();
  });

  it('Link component has title equel to "Conference"',() => {
    const linkComponent = setup().find('Link');
    expect(linkComponent.prop("children")).toBe('Conference');
  });

  it('Link component has prop "to" equel to "/"',() => {
    const linkComponent = setup().find('Link');
    expect(linkComponent.prop("to")).toBe("/");
  });

  it('should render div for Navigation Link Separator with className nav-link-separator',() => {
    const divElement = setup().find('div');
    expect(divElement.hasClass("nav-link-separator")).toBeTruthy();
  });

});
