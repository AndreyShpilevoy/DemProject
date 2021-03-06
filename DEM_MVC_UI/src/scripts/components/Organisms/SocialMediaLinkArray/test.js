/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import socialMediaLinks from 'api/__fakeData__/socialMediaLinks';
import SocialMediaLinkArray from './index';

describe('SocialMediaLinkArray', () => {
  function setup() {
    const props = {
      socialMediaLinkArray: [socialMediaLinks[1], socialMediaLinks[0]]
    };

    return shallow(<SocialMediaLinkArray {...props}/>);
  }

  it('child contains 2 SocialMediaLinkItem components',() => {
    const chapterItems = setup().find('SocialMediaLinkItem');
    expect(chapterItems.length).toEqual(2);
  });

  it('child SocialMediaLinkItem components should be ordered by order property',() => {
    let socialMediaLinkItemOrder = [];
    setup().find('SocialMediaLinkItem').forEach(function (node) {
      socialMediaLinkItemOrder.push(node.props().sociaMediaLinkItem.order);
    });
    expect(socialMediaLinkItemOrder).toEqual([ 1, 2 ]);
  });
});
