/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import SubForumList from "../SubForumList";
import forums from "../../api/__fakeData__/forums";

describe('SubForumList', () => {
  function setup() {
    const props = {
      subForumList: forums[0].subForumList
    };

    return shallow(<SubForumList {...props}/>);
  }

  it('should render top level div with className "sub-forum-list-container"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass("sub-forum-list-container")).toBeTruthy();
  });

  it('child contains 3 SubForumItem components',() => {
    const subForumItem = setup().find("SubForumItem");
    expect(subForumItem.length).toEqual(2);
  });

  it('child SubForumItem components should be ordered by order property',() => {
    let subForumItemOrder = [];
    setup().find("SubForumItem").forEach(function (node) {
      subForumItemOrder.push(node.props().subForumItem.order);
    });
    expect(subForumItemOrder).toEqual([ 1, 2 ]);
  });
});
