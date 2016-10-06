/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import {ForumItem} from "../_all";

describe('ForumItem', () => {
  function setup() {
    const props = {
      forumItem: {
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
        subForumList: [{
            id: 11,
            title: "Самопал",
            order: 35
        },{
            id: 12,
            title: "Архив форумки",
            order: 12
        }]
      }
    };

    return shallow(<ForumItem {...props}/>);
  }

  it('should render top level div with className "forum-container-wrapper"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass("forum-container-wrapper")).toBeTruthy();
  });

  it('should contain 1 SubForumList element',() => {
    const subForumListElement = setup().find('SubForumList');
    expect(subForumListElement.length).toEqual(1);
  });

  it('should contain 3 TermItem element',() => {
    const termItemElement = setup().find('Connect(TermItem)');
    expect(termItemElement.length).toEqual(3);
  });

  it('should contain 1 RelativeDateTime element',() => {
    const relativeDateTimeElement = setup().find('Connect(RelativeDateTime)');
    expect(relativeDateTimeElement.length).toEqual(1);
  });

  it('should contain 3 Link element',() => {
    const linkElement = setup().find('Link');
    expect(linkElement.length).toEqual(3);
  });

  it('should have default state',() => {
    const expectedState = {
      latesPostAutorNameStyle: {
        color: "#ffa510"
      }
    };

    const stateElement = setup().state();
    expect(stateElement).toEqual(expectedState);
  });
});
