/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */
/* eslint import/imports-first: "off" */

jest.mock('../../utils/_all');

import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import ChapterItem from "../ChapterItem";

describe('ChapterItem', () => {
  function setup() {
    const props = {
      chapterItem: {
        id: 1,
        title: "ChapteItemId",
        order: 1,
      }
    };

    return shallow(<ChapterItem {...props}/>, { lifecycleExperimental: true });
  }

  it('should render top level div with className "chapter-container"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass("chapter-container")).toBeTruthy();
  });

  it('should have default state',() => {
    const expectedState = {
      chapterHeaderId: 'chapter-header-1',
      chapterBodyId: 'chapter-body-1',
      toggleBodyClass: 'chapter-body-opened',
      iconArrowLeftId: 'icon-arrow-left-1',
      toggleIconArrowClass: 'icon-arrow-left-opened'
    };

    const stateElement = setup().state();
    expect(stateElement).toEqual(expectedState);
  });

  it('should call componentDidMount once',() => {
    sinon.spy(ChapterItem.prototype, 'componentDidMount');
    setup();
    expect(ChapterItem.prototype.componentDidMount.calledOnce).toBeTruthy();
  });

  it('should contain 1 Link element',() => {
    const linkElement = setup().find('Link');
    expect(linkElement.length).toEqual(1);
  });

  it('should contain 3 TermItem element',() => {
    const termItemElement = setup().find('Connect(TermItem)');
    expect(termItemElement.length).toEqual(3);
  });

  it('should contain 1 ForumList element',() => {
    const forumList = setup().find('Connect(ForumList)');
    expect(forumList.length).toEqual(1);
  });
});
