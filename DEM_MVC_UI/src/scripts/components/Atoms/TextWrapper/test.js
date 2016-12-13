/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import TextWrapper from './index';

describe('TextWrapper', () => {
  it('should render top level span with className "test-class-name" and "minute ago"',() => {
    const props = {
      spanContent: 'minute ago',
      className: 'test-class-name'
    };

    const spanElement = shallow(<TextWrapper {...props}/>).find('span');
    expect(spanElement.hasClass('test-class-name')).toBeTruthy();
  });

  it('should render top level span with className "minute ago" and without "test-class-name"',() => {
    const props = {
      spanContent: 'minute ago'
    };

    const spanElement = shallow(<TextWrapper {...props}/>).find('span');
    expect(spanElement.hasClass('test-class-name')).toBeFalsy();
  });

  it('span component has content equel to empty className',() => {
    const props = {
      spanContent: 'minute ago',
      spaceBefore: false,
      spaceAfter: false,
    };

    const spanElement = shallow(<TextWrapper {...props}/>).find('span');
    expect(spanElement.node.props.className).toBe('  ');
  });

  it('span component has content equel to className with 2 undefined',() => {
    const props = {
      spanContent: 'minute ago',
      spaceBefore: true,
      spaceAfter: true,
    };

    const spanElement = shallow(<TextWrapper {...props}/>).find('span');
    expect(spanElement.node.props.className).toBe(' undefined undefined');
  });

  it('span component is Empty',() => {
    const spanElement = shallow(<TextWrapper />).find('span').isEmpty();
    expect(spanElement).toBeTruthy();
  });

});
