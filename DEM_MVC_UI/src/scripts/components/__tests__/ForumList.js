/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import ForumList from "../ForumList";

describe('ForumList', () => {
  function setup() {
    const props = {
      forumList: [{
        id: 1,
        order: 1,
        title: "Forum Item Title",
        description: "Forum Item Description",
        topicsCount: 10,
        postsCount: 100,
        lastActiveTopicId: 5,
        lastActiveTopic: "Forum Item Last Active Topic",
        latesPostTimeCreation: new Date(1990,0,10),
        latesPostAutorId: 2,
        latesPostAutorName: "kto",
        latesPostAutorGroupColor: "ffa510",
        subForums: []
      },
      {
        id: 3,
        order: 3,
        title: "Forum Item Title 3",
        description: "Forum Item Description 3",
        topicsCount: 103,
        postsCount: 1003,
        lastActiveTopicId: 53,
        lastActiveTopic: "Forum Item Last Active Topic 3",
        latesPostTimeCreation: new Date(1990,0,13),
        latesPostAutorId: 23,
        latesPostAutorName: "kto 3",
        latesPostAutorGroupColor: "000000",
        subForums: []
      },
      {
        id: 2,
        order: 2,
        title: "Forum Item Title 2",
        description: "Forum Item Description 2",
        topicsCount: 102,
        postsCount: 1002,
        lastActiveTopicId: 52,
        lastActiveTopic: "Forum Item Last Active Topic 2",
        latesPostTimeCreation: new Date(1990,0,12),
        latesPostAutorId: 22,
        latesPostAutorName: "kto 2",
        latesPostAutorGroupColor: "ffffff",
        subForums: []
      }]
    };

    return shallow(<ForumList {...props}/>);
  }

  it('should render top level div with className "forums-container"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass("forums-container")).toBeTruthy();
  });

  it('child contains 3 ForumItem components',() => {
    const forumItem = setup().find("ForumItem");
    expect(forumItem.length).toEqual(3);
  });

  it('child ForumItem components should be sorted by order property',() => {
    let forumItemOrder = [];
    setup().find("ForumItem").forEach(function (node) {
      forumItemOrder.push(node.props().forumItem.order);
    });
    expect(forumItemOrder).toEqual([ 1, 2, 3 ]);
  });
});
