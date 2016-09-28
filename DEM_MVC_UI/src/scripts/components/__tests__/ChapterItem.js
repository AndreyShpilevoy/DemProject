/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */
/* eslint import/imports-first: "off" */

jest.mock('../../containers/_all');
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

  it('should render top level div with className "chapter-container"',() => {
    sinon.spy(ChapterItem.prototype, 'componentDidMount');
    setup();
    expect(ChapterItem.prototype.componentDidMount.calledOnce).toBeTruthy();
  });
  //
  // it('should render top level span with className "term" and without "test-class-name"',() => {
  //   const props = {
  //     term: "term"
  //   };
  //
  //   const spanElement = shallow(<ChapterItem {...props}/>).find('span');
  //   expect(spanElement.hasClass("test-class-name")).toBeFalsy();
  //   expect(spanElement.hasClass("term")).toBeTruthy();
  // });
  //
  // it('span component has content equel to "term"',() => {
  //   const props = {
  //     term: "term",
  //     spaceBefore: false,
  //     spaceAfter: false,
  //   };
  //
  //   const spanElement = shallow(<ChapterItem {...props}/>).find('span');
  //   expect(spanElement.prop("children")).toBe("term");
  // });
  //
  // it('span component has content equel to " term "',() => {
  //   const props = {
  //     term: "term",
  //     spaceBefore: true,
  //     spaceAfter: true,
  //   };
  //
  //   const spanElement = shallow(<ChapterItem {...props}/>).find('span');
  //   expect(spanElement.prop("children")).toBe(" term ");
  // });
  //
  // it('span component is Empty',() => {
  //   const spanElement = shallow(<ChapterItem />).find('span').isEmpty();
  //   expect(spanElement).toBeTruthy();
  // });

});
