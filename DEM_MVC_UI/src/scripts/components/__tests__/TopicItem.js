/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import TopicItem from 'components/TopicItem';
import topics from 'api/__fakeData__/topics';

describe('TopicItem', () => {
  function setup(hasAvatar=true, parentForum=true) {
    const props = {
      topicItem: Object.assign({}, topics[0],
        {
          lastPostInfo: Object.assign({}, topics[0].lastPostInfo, {
            latesPostAutorAvatart: hasAvatar ? 'http://i70.fastpic.ru/big/2015/0628/36/ccbb1e2cb8ba8dbd379a6a12dc6b8336.jpg' : null
          }),
          parentForumTitle: parentForum ? 'Самопал' : undefined,
          parentForumId: parentForum ? 1 : undefined
        }
      )
    };

    return shallow(<TopicItem {...props}/>);
  }

  it('should render top level div with className "topic-container-wrapper"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass('topic-container-wrapper')).toBeTruthy();
  });

  it('should contain 1 RelativeDateTime element',() => {
    const relativeDateTimeElement = setup().find('Connect(RelativeDateTime)');
    expect(relativeDateTimeElement.length).toEqual(1);
  });

  it('if has parentForumId and ParentForumTitle - should contain 4 TermItem element',() => {
    const termItemElement = setup().find('Connect(TermItem)');
    expect(termItemElement.length).toEqual(4);
  });

  it('if has parentForumId and ParentForumTitle - should contain 5 Link element if user has avatar',() => {
    const linkElement = setup().find('Link');
    expect(linkElement.length).toEqual(5);
  });

  it('if has not parentForumId and ParentForumTitle - should contain 2 TermItem element',() => {
    const termItemElement = setup(true,false).find('Connect(TermItem)');
    expect(termItemElement.length).toEqual(2);
  });

  it('if has not parentForumId and ParentForumTitle - should contain 3 Link element if user has avatar',() => {
    const linkElement = setup(true,false).find('Link');
    expect(linkElement.length).toEqual(3);
  });

  it('if has parentForumId and ParentForumTitle and has no avatar link - should contain 4 Link element if user has no avatar',() => {
    const linkElement = setup(false).find('Link');
    expect(linkElement.length).toEqual(4);
  });

  it('should have default state',() => {
    const expectedState = {
      latesPostAutorNameStyle: {
        color: '#00AA00'
      }
    };

    const stateElement = setup(true).state();
    expect(stateElement).toEqual(expectedState);
  });
});
