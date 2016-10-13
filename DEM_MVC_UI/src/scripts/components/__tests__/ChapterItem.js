/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import ChapterItem from "../ChapterItem";
import chapters from "../../api/__fakeData__/chapters";

describe('ChapterItem', () => {
  function setup() {
    const props = {
      chapterItem: chapters[0]
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
     '"titleElement.props.to" equel to "/Conference/Forum/1"',() => {
    const titleElement = setup().prop("collapsibleWrapperItem").titleElement;
    expect(titleElement.type.displayName).toEqual("Link");
    expect(titleElement.props.to).toEqual("/Conference/Forum/1");
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"bodyElement.type.displayName" equel to "Connect(ForumList)", with ' +
     '"bodyElement.props.chapterId" equel to "1"',() => {
    const bodyElement = setup().prop("collapsibleWrapperItem").bodyElement;
    expect(bodyElement.type.displayName).toEqual("Connect(ForumList)");
    expect(bodyElement.props.chapterId).toEqual(1);
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"firstColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"firstColumnTerm.props.term" equel to expected model',() => {
    const firstColumnTerm = setup().prop("collapsibleWrapperItem").firstColumnTerm;
    expect(firstColumnTerm.type.displayName).toEqual("Connect(TermItem)");
    expect(firstColumnTerm.props.term).toEqual({id: 1, value: "Topics"});
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"secondColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"secondColumnTerm.props.term" equel to expected model',() => {
    const secondColumnTerm = setup().prop("collapsibleWrapperItem").secondColumnTerm;
    expect(secondColumnTerm.type.displayName).toEqual("Connect(TermItem)");
    expect(secondColumnTerm.props.term).toEqual({id: 2, value: "Posts"});
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"thirdColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"thirdColumnTerm.props.term" equel to expected model',() => {
    const thirdColumnTerm = setup().prop("collapsibleWrapperItem").thirdColumnTerm;
    expect(thirdColumnTerm.type.displayName).toEqual("Connect(TermItem)");
    expect(thirdColumnTerm.props.term).toEqual({id: 3, value: "Last message in"});
  });
});
