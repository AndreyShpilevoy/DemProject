/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import forums from 'api/__fakeData__/forums';
import ForumItem from './index';

describe('ForumItem', () => {
  function setup() {
    const props = {
      forumItem: forums[0]
    };

    return shallow(<ForumItem {...props}/>);
  }

  it('should contain 1 SubForumArray element',() => {
    const subForumArrayElement = setup().find('SubForumArray');
    expect(subForumArrayElement.length).toEqual(1);
  });

  it('should contain 3 TermItem element',() => {
    const termItemElement = setup().find('Connect(TermItem)');
    expect(termItemElement.length).toEqual(3);
  });

  it('should contain 1 RelativeDateTime element',() => {
    const relativeDateTimeElement = setup().find('Connect(RelativeDateTime)');
    expect(relativeDateTimeElement.length).toEqual(1);
  });

  it('should contain 2 Link element',() => {
    const linkElement = setup().find('Link');
    expect(linkElement.length).toEqual(2);
  });
});
