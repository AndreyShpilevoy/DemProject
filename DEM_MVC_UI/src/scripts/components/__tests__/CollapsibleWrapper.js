/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import { Link } from 'react-router';
import CollapsibleWrapper from "../CollapsibleWrapper";
import ForumArray from '../../containers/ForumArray';
import TermItem from '../../containers/TermItem';

describe('CollapsibleWrapper', () => {
  function setup(collapseSettings) {
    const props = {
      collapsibleWrapperItem: {
        uniquePrefix: "chapter-item-with-id-1",
        titleElement: <Link to={`/Conference/Forum/1`}>"Title"</Link>,
        bodyElement: <ForumArray chapterId={1}/>,
        firstColumnTerm: <TermItem term={{id: 1, value: "Topics"}} />,
        secondColumnTerm:<TermItem term={{id: 2, value: "Posts"}} />,
        thirdColumnTerm: <TermItem term={{id: 3, value: "Last message in"}} />
      },
      collapseSettings: collapseSettings
    };

    return shallow(<CollapsibleWrapper {...props}/>);
  }

  it('should render top level div with className "collapsible-wrapper-container" "collapsibleWrapperItem.openedByDefault" is "true"',() => {
    const divElement = setup({collapsable: true, openedByDefault: false}).find('div').first();
    expect(divElement.hasClass("collapsible-wrapper-container")).toBeTruthy();
  });

  it('should render last div with className "collapsible-wrapper-body-opened" if ',() => {
    const divElement = setup({collapsable: true, openedByDefault: true}).find("div").last();
    expect(divElement.hasClass("collapsible-wrapper-body-opened")).toBeTruthy();
  });

  it('should have default state',() => {
    const expectedState = {
      collapsibleWrapperHeaderId: 'collapsible-wrapper-header-chapter-item-with-id-1',
      collapsibleWrapperBodyId: 'collapsible-wrapper-body-chapter-item-with-id-1',
      toggleBodyClass: 'collapsible-wrapper-body-opened',
      iconArrowLeftId: 'icon-arrow-left-chapter-item-with-id-1',
      toggleIconArrowClass: 'icon-arrow-left-opened'
    };

    const stateElement = setup({collapsable: true, openedByDefault: false}).state();
    expect(stateElement).toEqual(expectedState);
  });

  it('should contain 1 Link element',() => {
    const linkElement = setup({collapsable: true, openedByDefault: false}).find('Link');
    expect(linkElement.length).toEqual(1);
  });

  it('should contain 3 TermItem element',() => {
    const termItemElement = setup({collapsable: true, openedByDefault: false}).find('Connect(TermItem)');
    expect(termItemElement.length).toEqual(3);
  });

  it('should contain 1 ForumArray element',() => {
    const forumArray = setup({collapsable: true, openedByDefault: false}).find('Connect(ForumArray)');
    expect(forumArray.length).toEqual(1);
  });

  it('should contain 0 ArrowLeft element if "collapsable" false',() => {
    const linkElement = setup({collapsable: false, openedByDefault: false}).find('ArrowLeft');
    expect(linkElement.length).toEqual(0);
  });

  it('should contain 1 ArrowLeft element if "collapsable" true',() => {
    const linkElement = setup({collapsable: true, openedByDefault: false}).find('ArrowLeft');
    expect(linkElement.length).toEqual(1);
  });
});
