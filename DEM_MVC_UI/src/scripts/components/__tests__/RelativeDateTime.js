/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import {RelativeDateTime} from "../_all";

describe('RelativeDateTime', () => {
  it('should render top level span with className "test-class-name" and "minute ago"',() => {
    const props = {
      relativeDateTime: "minute ago",
      className: "test-class-name"
    };

    const spanElement = shallow(<RelativeDateTime {...props}/>).find('span');
    expect(spanElement.hasClass("test-class-name")).toBeTruthy();
    expect(spanElement.hasClass("relativeDateTime")).toBeTruthy();
  });

  it('should render top level span with className "minute ago" and without "test-class-name"',() => {
    const props = {
      relativeDateTime: "minute ago"
    };

    const spanElement = shallow(<RelativeDateTime {...props}/>).find('span');
    expect(spanElement.hasClass("test-class-name")).toBeFalsy();
    expect(spanElement.hasClass("relativeDateTime")).toBeTruthy();
  });

  it('span component has content equel to "minute ago"',() => {
    const props = {
      relativeDateTime: "minute ago",
      spaceBefore: false,
      spaceAfter: false,
    };

    const spanElement = shallow(<RelativeDateTime {...props}/>).find('span');
    expect(spanElement.prop("children")).toBe("minute ago");
  });

  it('span component has content equel to " minute ago "',() => {
    const props = {
      relativeDateTime: "minute ago",
      spaceBefore: true,
      spaceAfter: true,
    };

    const spanElement = shallow(<RelativeDateTime {...props}/>).find('span');
    expect(spanElement.prop("children")).toBe(" minute ago ");
  });

  it('span component is Empty',() => {
    const spanElement = shallow(<RelativeDateTime />).find('span').isEmpty();
    expect(spanElement).toBeTruthy();
  });

});
