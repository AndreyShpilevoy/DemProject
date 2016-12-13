/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import topics from 'api/__fakeData__/topics';
import TopicItem from './index';

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

  it('should contain 1 RelativeDateTime element',() => {
    const relativeDateTimeElement = setup().find('Connect(RelativeDateTime)');
    expect(relativeDateTimeElement.length).toEqual(1);
  });

  it('if has parentForumId and ParentForumTitle - should contain 3 TermItem element',() => {
    const termItemElement = setup().find('Connect(TermItem)');
    expect(termItemElement.length).toEqual(3);
  });

  it('if has not parentForumId and ParentForumTitle - should contain 2 TermItem element',() => {
    const termItemElement = setup(true,false).find('Connect(TermItem)');
    expect(termItemElement.length).toEqual(2);
  });

  it('should contain 1 UserAvatar component',() => {
    const termItemElement = setup().find('UserAvatar');
    expect(termItemElement.length).toEqual(1);
  });

  it('should contain 1 UserName component',() => {
    const termItemElement = setup().find('UserName');
    expect(termItemElement.length).toEqual(1);
  });

});
