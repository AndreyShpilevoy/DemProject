/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import forums from 'api/__fakeData__/forums';
import SubForumArray from './index';

describe('SubForumArray', () => {
  function setup() {
    const props = {
      subForumArray: forums[0].subForumArray
    };

    return shallow(<SubForumArray {...props}/>);
  }

  it('child contains 3 SubForumItem components',() => {
    const subForumItem = setup().find('SubForumItem');
    expect(subForumItem.length).toEqual(2);
  });

  it('child SubForumItem components should be ordered by order property',() => {
    let subForumItemOrder = [];
    setup().find('SubForumItem').forEach(function (node) {
      subForumItemOrder.push(node.props().subForumItem.order);
    });
    expect(subForumItemOrder).toEqual([ 1, 2 ]);
  });
});
