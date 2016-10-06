/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import {TermItem} from "../_all";

describe('TermItem', () => {
  it('should render top level span with className "test-class-name" and "term"',() => {
    const props = {
      term: "term",
      className: "test-class-name"
    };

    const spanElement = shallow(<TermItem {...props}/>).find('span');
    expect(spanElement.hasClass("test-class-name")).toBeTruthy();
    expect(spanElement.hasClass("term")).toBeTruthy();
  });

  it('should render top level span with className "term" and without "test-class-name"',() => {
    const props = {
      term: "term"
    };

    const spanElement = shallow(<TermItem {...props}/>).find('span');
    expect(spanElement.hasClass("test-class-name")).toBeFalsy();
    expect(spanElement.hasClass("term")).toBeTruthy();
  });

  it('span component has content equel to "term"',() => {
    const props = {
      term: "term",
      spaceBefore: false,
      spaceAfter: false,
    };

    const spanElement = shallow(<TermItem {...props}/>).find('span');
    expect(spanElement.prop("children")).toBe("term");
  });

  it('span component has content equel to " term "',() => {
    const props = {
      term: "term",
      spaceBefore: true,
      spaceAfter: true,
    };

    const spanElement = shallow(<TermItem {...props}/>).find('span');
    expect(spanElement.prop("children")).toBe(" term ");
  });

  it('span component is Empty',() => {
    const spanElement = shallow(<TermItem />).find('span').isEmpty();
    expect(spanElement).toBeTruthy();
  });

});
