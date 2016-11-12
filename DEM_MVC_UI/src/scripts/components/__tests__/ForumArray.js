/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import ForumArray from 'components/ForumArray';
import forums from 'api/__fakeData__/forums';

describe('ForumArray', () => {
  function setup() {
    const props = {
      forumArray: [forums[2], forums[0], forums[1]]
    };

    return shallow(<ForumArray {...props}/>);
  }

  it('should render top level div with className "forums-container"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass('forums-container')).toBeTruthy();
  });

  it('child contains 3 ForumItem components',() => {
    const forumItem = setup().find('ForumItem');
    expect(forumItem.length).toEqual(3);
  });

  it('child ForumItem components should be ordered by order property',() => {
    let forumItemOrder = [];
    setup().find('ForumItem').forEach(function (node) {
      forumItemOrder.push(node.props().forumItem.order);
    });
    expect(forumItemOrder).toEqual([ 1, 2, 3 ]);
  });
});
