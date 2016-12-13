/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import Layout from './index';

describe('Layout', () => {
  function setup() {
    return shallow(<Layout><span>{'test'}</span></Layout>);
  }

  it('should render one "div"',() => {
    const divElement = setup().find('div').first();
    expect(divElement).toBeTruthy();
  });

  it('should contain 1 "Header" element',() => {
    const headerElement = setup().find('Header');
    expect(headerElement.length).toEqual(1);
  });

  it('should contain 1 "Footer" element',() => {
    const footerElement = setup().find('Footer');
    expect(footerElement.length).toEqual(1);
  });

  it('should contain 1 children element - "span"',() => {
    const footerElement = setup().find('span');
    expect(footerElement.length).toEqual(1);
    expect(footerElement.prop('children')).toBe('test');
  });
});
