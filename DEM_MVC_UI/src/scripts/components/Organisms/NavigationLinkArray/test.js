/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import navigationLinks from 'api/__fakeData__/navigationLinks';
import NavigationLinkArray from './index';

describe('NavigationLinkArray', () => {
  function setup() {
    const props = {
      navigationLinkArray: [navigationLinks[2], navigationLinks[0], navigationLinks[1]]
    };

    return shallow(<NavigationLinkArray {...props}/>);
  }

  it('child contains 3 "NavigationLinkItem" components',() => {
    const chapterItems = setup().find('NavigationLinkItem');
    expect(chapterItems.length).toEqual(3);
  });

  it('child "NavigationLinkItem" components should be ordered by order property',() => {
    let navigationLinkItemOrder = [];
    setup().find('NavigationLinkItem').forEach(function (node) {
      navigationLinkItemOrder.push(node.props().navigationLinkItem.order);
    });
    expect(navigationLinkItemOrder).toEqual([ 1, 2, 3 ]);
  });
});
