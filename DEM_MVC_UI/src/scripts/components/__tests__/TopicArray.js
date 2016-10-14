/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import TopicArray from "../TopicArray";
import topics from "../../api/__fakeData__/topics";

describe('TopicArray', () => {
  function setup() {
    const props = {
      forumId: 1,
      topicArray: [topics[2], topics[0], topics[1]]
    };

    return shallow(<TopicArray {...props}/>);
  }

  it('should render CollapsibleWrapper',() => {
    const collapsibleWrapperElement = setup().find('CollapsibleWrapper').first();
    expect(collapsibleWrapperElement).toBeTruthy();
  });


  it('props should contain "collapsibleWrapperItem" object with "uniquePrefix" equel to "topic-array-with-forum-id-1"',() => {
    expect(setup().prop("collapsibleWrapperItem").uniquePrefix).toEqual("topic-array-with-forum-id-1");
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"titleElement.type.displayName" equel to "Connect(TermItem)", with ' +
     '"titleElement.props.term" equel to "Topics"',() => {
    const titleElement = setup().prop("collapsibleWrapperItem").titleElement;
    expect(titleElement.type.displayName).toEqual("Connect(TermItem)");
    expect(titleElement.props.term).toEqual({"id": 23, "value": "Topics"});
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"bodyElement.props.children.length" equel to "3", with ' +
     '"bodyElement.props.children[0].type.name" equel to "TopicItem"',() => {
    const bodyElement = setup().prop("collapsibleWrapperItem").bodyElement;
    expect(bodyElement.props.children.length).toEqual(3);
    expect(bodyElement.props.children[0].type.name).toEqual("TopicItem");
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"firstColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"firstColumnTerm.props.term" equel to expected model',() => {
    const firstColumnTerm = setup().prop("collapsibleWrapperItem").firstColumnTerm;
    expect(firstColumnTerm.type.displayName).toEqual("Connect(TermItem)");
    expect(firstColumnTerm.props.term).toEqual({id: 2, value: "Posts"});
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"secondColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"secondColumnTerm.props.term" equel to expected model',() => {
    const secondColumnTerm = setup().prop("collapsibleWrapperItem").secondColumnTerm;
    expect(secondColumnTerm.type.displayName).toEqual("Connect(TermItem)");
    expect(secondColumnTerm.props.term).toEqual({id: 22, value: "Views"});
  });

  it('props should contain "collapsibleWrapperItem" object with ' +
     '"thirdColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"thirdColumnTerm.props.term" equel to expected model',() => {
    const thirdColumnTerm = setup().prop("collapsibleWrapperItem").thirdColumnTerm;
    expect(thirdColumnTerm.type.displayName).toEqual("Connect(TermItem)");
    expect(thirdColumnTerm.props.term).toEqual({id: 3, value: "Last message in"});
  });
});
