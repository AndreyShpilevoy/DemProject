/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import SubForumList from "../SubForumList";

describe('SubForumList', () => {
  function setup() {
    const props = {
      subForumList: [{
        id: 1,
        order: 1,
        title: "Forum Item Title"
      },
      {
        id: 3,
        order: 3,
        title: "Forum Item Title 3"
      },
      {
        id: 2,
        order: 2,
        title: "Forum Item Title 2"
      }]
    };

    return shallow(<SubForumList {...props}/>);
  }

  it('should render top level div with className "sub-forum-list-container"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass("sub-forum-list-container")).toBeTruthy();
  });

  it('child contains 3 SubForumItem components',() => {
    const subForumItem = setup().find("SubForumItem");
    expect(subForumItem.length).toEqual(3);
  });

  it('child SubForumItem components should be sorted by order property',() => {
    let subForumItemOrder = [];
    setup().find("SubForumItem").forEach(function (node) {
      subForumItemOrder.push(node.props().subForumItem.order);
    });
    expect(subForumItemOrder).toEqual([ 1, 2, 3 ]);
  });
});
