/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import NavigationLinkItem from "../../src/scripts/components/NavigationLinkItem";

describe('NavigationLinkItem', () => {
  function setup() {
    const props = {
      navigationLinkItem: {id: 1, title: "test", href: "TestHref", order: 1}
    };
    return shallow(<NavigationLinkItem {...props}/>);
  }

  it('should render top level li',() => {
    const columnsDiv = setup().find('li');
    expect(columnsDiv.length).toBe(1);
    expect(columnsDiv.hasClass("nav-list-item")).toBeTruthy();
  });

});
