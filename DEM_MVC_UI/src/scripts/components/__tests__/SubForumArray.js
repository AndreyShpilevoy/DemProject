/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import SubForumArray from "components/SubForumArray";
import forums from "api/__fakeData__/forums";

describe('SubForumArray', () => {
  function setup() {
    const props = {
      subForumArray: forums[0].subForumArray
    };

    return shallow(<SubForumArray {...props}/>);
  }

  it('should render top level div with className "sub-forum-array-container"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass("sub-forum-array-container")).toBeTruthy();
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
