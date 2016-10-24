/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import LastActiveTopicArray from "components/LastActiveTopicArray";
import lastActiveTopics from "api/__fakeData__/lastActiveTopics";

describe('LastActiveTopicArray', () => {
  function setup() {
    const props = {
      lastActiveTopics: [lastActiveTopics[2], lastActiveTopics[0], lastActiveTopics[1]]
    };

    return shallow(<LastActiveTopicArray {...props}/>);
  }

  it('should render ContentHolder',() => {
    const contentHolderElement = setup().find('ContentHolder').first();
    expect(contentHolderElement.node.type.name).toEqual("ContentHolder");
  });

  it('props should contain "contentHolderItem" object with "uniquePrefix" equel to "last-topic-array"',() => {
    expect(setup().prop("contentHolderItem").uniquePrefix).toEqual("last-topic-array");
  });

  it('props should contain "contentHolderItem" object with ' +
     '"titleElement.type.displayName" equel to "Connect(TermItem)", with ' +
     '"titleElement.props.term" equel to "Last messages"',() => {
    const titleElement = setup().prop("contentHolderItem").titleElement;
    expect(titleElement.type.displayName).toEqual("Connect(TermItem)");
    expect(titleElement.props.term).toEqual({"id": 26, "value": "Last messages"});
  });

  it('props should contain "contentHolderItem" object with ' +
     '"bodyElement.props.children.length" equel to "3", with ' +
     '"bodyElement.props.children[0].type.name" equel to "TopicItem"',() => {
    const bodyElement = setup().prop("contentHolderItem").bodyElement;
    expect(bodyElement.props.children.length).toEqual(3);
    expect(bodyElement.props.children[0].type.name).toEqual("TopicItem");
  });

  it('props should contain "contentHolderItem" object with ' +
     '"firstColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"firstColumnTerm.props.term" equel to expected model',() => {
    const firstColumnTerm = setup().prop("contentHolderItem").firstColumnTerm;
    expect(firstColumnTerm.type.displayName).toEqual("Connect(TermItem)");
    expect(firstColumnTerm.props.term).toEqual({id: 2, value: "Posts"});
  });

  it('props should contain "contentHolderItem" object with ' +
     '"secondColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"secondColumnTerm.props.term" equel to expected model',() => {
    const secondColumnTerm = setup().prop("contentHolderItem").secondColumnTerm;
    expect(secondColumnTerm.type.displayName).toEqual("Connect(TermItem)");
    expect(secondColumnTerm.props.term).toEqual({id: 22, value: "Views"});
  });

  it('props should contain "contentHolderItem" object with ' +
     '"thirdColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"thirdColumnTerm.props.term" equel to expected model',() => {
    const thirdColumnTerm = setup().prop("contentHolderItem").thirdColumnTerm;
    expect(thirdColumnTerm.type.displayName).toEqual("Connect(TermItem)");
    expect(thirdColumnTerm.props.term).toEqual({id: 3, value: "Last message in"});
  });
});
