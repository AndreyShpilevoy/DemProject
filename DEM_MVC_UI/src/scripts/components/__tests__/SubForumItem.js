/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import SubForumItem from "../SubForumItem";
import forums from "../../api/__fakeData__/forums";

describe('SubForumItem', () => {
  function setup() {
    const props = {
      subForumItem: forums[0].subForumArray[0]
    };

    return shallow(<SubForumItem {...props}/>);
  }

  it('should render top level div with className "sub-forum-item-container"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass("sub-forum-item-container")).toBeTruthy();
  });

  it('should contain 1 "Link" element',() => {
    const linkElement = setup().find('Link');
    expect(linkElement.length).toEqual(1);
  });

  it('should contain 1 "RightAngle" element',() => {
    const linkElement = setup().find('RightAngle');
    expect(linkElement.length).toEqual(1);
  });
});
