/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import { Link } from 'react-router';
import ForumArray from 'containers/ForumArray';
import TermItem from 'containers/TermItem';
import ContentHolder from './index';

describe('ContentHolder', () => {
  function setup(collapseSettings) {
    const props = {
      contentHolderItem: {
        uniquePrefix: 'chapter-item-with-id-1',
        titleElement: <Link to={'/Conference/Forum/1'}>{'Title'}</Link>,
        bodyContent: <ForumArray chapterId={1}/>,
        firstColumnTerm: <TermItem term={{id: 1, value: 'Topics'}} />,
        secondColumnTerm:<TermItem term={{id: 2, value: 'Posts'}} />,
        thirdColumnTerm: <TermItem term={{id: 3, value: 'Last message in'}} />
      },
      collapseSettings: collapseSettings
    };

    return shallow(<ContentHolder {...props}/>);
  }

  it('should have default state',() => {
    const expectedState = {
      contentHolderBodyId: 'contentHolderBody-chapter-item-with-id-1',
      contentHolderHeaderId: 'contentHolderHeader-chapter-item-with-id-1',
      toggleBodyClass: undefined
    };

    const stateElement = setup({collapsable: true, openedByDefault: false}).state();
    expect(stateElement).toEqual(expectedState);
  });

  it('should contain 1 ContentHolderTitle element',() => {
    const contentHolderTitleElement = setup({collapsable: true, openedByDefault: false}).find('ContentHolderTitle');
    expect(contentHolderTitleElement.length).toBe(1);
  });

  it('should contain 1 ContentHolderBody element',() => {
    const contentHolderBodyElement = setup({collapsable: true, openedByDefault: false}).find('ContentHolderBody');
    expect(contentHolderBodyElement.length).toBe(1);
  });

  it('should contain 1 ForumArray element',() => {
    const forumArray = setup({collapsable: true, openedByDefault: false}).find('Connect(ForumArray)');
    expect(forumArray.length).toEqual(1);
  });
});
