/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import ForumItem from 'components/ForumItem';
import forums from 'api/__fakeData__/forums';

describe('ForumItem', () => {
  function setup() {
    const props = {
      forumItem: forums[0]
    };

    return shallow(<ForumItem {...props}/>);
  }

  it('should render top level div with className "forum-container-wrapper"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass('forum-container-wrapper')).toBeTruthy();
  });

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

  it('should contain 3 Link element',() => {
    const linkElement = setup().find('Link');
    expect(linkElement.length).toEqual(3);
  });

  it('should have default state',() => {
    const expectedState = {
      latesPostAutorNameStyle: {
        color: '#ffa510'
      }
    };

    const stateElement = setup().state();
    expect(stateElement).toEqual(expectedState);
  });
});
