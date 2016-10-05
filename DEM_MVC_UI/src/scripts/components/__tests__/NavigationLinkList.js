/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import NavigationLinkList from "../NavigationLinkList";

describe('NavigationLinkList', () => {
  function setup() {
    const props = {
      navigationLinkList: [{
        id: 1,
        title: "navigationLink-1",
        href: "http://1.ua",
        order: 1,
      },
      {
        id: 3,
        title: "navigationLink-3",
        href: "http://3.ua",
        order: 3,
      },
      {
        id: 2,
        title: "navigationLink-2",
        href: "http://2.ua",
        order: 2,
      }]
    };

    return shallow(<NavigationLinkList {...props}/>);
  }

  it('should render top level div with className "page-content"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass("nav-links-container")).toBeTruthy();
  });

  it('child contains 3 "NavigationLinkItem" components',() => {
    const chapterItems = setup().find("NavigationLinkItem");
    expect(chapterItems.length).toEqual(3);
  });

  it('child "NavigationLinkItem" components should be ordered by order property',() => {
    let navigationLinkItemOrder = [];
    setup().find("NavigationLinkItem").forEach(function (node) {
      navigationLinkItemOrder.push(node.props().navigationLinkItem.order);
    });
    expect(navigationLinkItemOrder).toEqual([ 1, 2, 3 ]);
  });
});
