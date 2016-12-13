/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import forums from 'api/__fakeData__/forums';
import SubForumItem from './index';

describe('SubForumItem', () => {
  function setup() {
    const props = {
      subForumItem: forums[0].subForumArray[0]
    };

    return shallow(<SubForumItem {...props}/>);
  }

  it('should contain 1 "Link" element',() => {
    const linkElement = setup().find('Link');
    expect(linkElement.length).toEqual(1);
  });

  it('should contain 1 "Icon_RightAngle" element',() => {
    const linkElement = setup().find('Icon_RightAngle');
    expect(linkElement.length).toEqual(1);
  });
});
