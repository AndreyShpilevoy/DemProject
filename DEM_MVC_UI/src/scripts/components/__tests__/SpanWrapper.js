/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import SpanWrapper from "components/SpanWrapper";

describe('SpanWrapper', () => {
  it('should render top level span with className "test-class-name" and "minute ago"',() => {
    const props = {
      spanContent: "minute ago",
      className: "test-class-name"
    };

    const spanElement = shallow(<SpanWrapper {...props}/>).find('span');
    expect(spanElement.hasClass("test-class-name")).toBeTruthy();
  });

  it('should render top level span with className "minute ago" and without "test-class-name"',() => {
    const props = {
      spanContent: "minute ago"
    };

    const spanElement = shallow(<SpanWrapper {...props}/>).find('span');
    expect(spanElement.hasClass("test-class-name")).toBeFalsy();
  });

  it('span component has content equel to "minute ago"',() => {
    const props = {
      spanContent: "minute ago",
      spaceBefore: false,
      spaceAfter: false,
    };

    const spanElement = shallow(<SpanWrapper {...props}/>).find('span');
    expect(spanElement.prop("children")).toBe("minute ago");
  });

  it('span component has content equel to " minute ago "',() => {
    const props = {
      spanContent: "minute ago",
      spaceBefore: true,
      spaceAfter: true,
    };

    const spanElement = shallow(<SpanWrapper {...props}/>).find('span');
    expect(spanElement.prop("children")).toBe(" minute ago ");
  });

  it('span component is Empty',() => {
    const spanElement = shallow(<SpanWrapper />).find('span').isEmpty();
    expect(spanElement).toBeTruthy();
  });

});
