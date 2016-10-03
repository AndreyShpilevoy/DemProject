/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import ChapterItem from "../ChapterItem";

jest.mock('../../utils/_all');

describe('ChapterItem', () => {
  function setup() {
    const props = {
      chapterItem: {
        id: 1,
        title: "ChapteItemId",
        order: 1,
      }
    };

    return shallow(<ChapterItem {...props}/>);
  }

  it('should render CollapsibleWrapper',() => {
    const collapsibleWrapperElement = setup().find('CollapsibleWrapper').first();
    expect(collapsibleWrapperElement).toBeTruthy();
  });

  it('props should contain "collapsibleWrapperItem" object with "Id" equel to 1',() => {
    expect(setup().prop("collapsibleWrapperItem").uniquePrefix).toEqual("chapter-item-with-id-1");
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"titleElement.type.displayName" equel to "Link", with ' +
     '"titleElement.props.to" equel to "/Conference/1"',() => {
    const titleElement = setup().prop("collapsibleWrapperItem").titleElement;
    expect(titleElement.type.displayName).toEqual("Link");
    expect(titleElement.props.to).toEqual("/Conference/1");
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"bodyElement.type.displayName" equel to "Connect(ForumList)", with ' +
     '"bodyElement.props.chapterId" equel to "1"',() => {
    const titleElement = setup().prop("collapsibleWrapperItem").bodyElement;
    expect(titleElement.type.displayName).toEqual("Connect(ForumList)");
    expect(titleElement.props.chapterId).toEqual(1);
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"firstColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"firstColumnTerm.props.term" equel to expected model',() => {
    const titleElement = setup().prop("collapsibleWrapperItem").firstColumnTerm;
    expect(titleElement.type.displayName).toEqual("Connect(TermItem)");
    expect(titleElement.props.term).toEqual({id: 1, value: "Topics"});
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"secondColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"secondColumnTerm.props.term" equel to expected model',() => {
    const titleElement = setup().prop("collapsibleWrapperItem").secondColumnTerm;
    expect(titleElement.type.displayName).toEqual("Connect(TermItem)");
    expect(titleElement.props.term).toEqual({id: 2, value: "Posts"});
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"thirdColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"thirdColumnTerm.props.term" equel to expected model',() => {
    const titleElement = setup().prop("collapsibleWrapperItem").thirdColumnTerm;
    expect(titleElement.type.displayName).toEqual("Connect(TermItem)");
    expect(titleElement.props.term).toEqual({id: 3, value: "Last message in"});
  });
});
