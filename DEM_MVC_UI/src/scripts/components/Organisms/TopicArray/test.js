/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import topics from 'api/__fakeData__/topics';
import TopicArray from './index';

describe('TopicArray', () => {
  function setup() {
    const props = {
      forumId: 1,
      topicArray: [topics[2], topics[0], topics[1]]
    };

    return shallow(<TopicArray {...props}/>);
  }

  it('should render ContentHolder',() => {
    const contentHolderElement = setup().find('ContentHolder').first();
    expect(contentHolderElement.node.type.name).toEqual('ContentHolder');
  });


  it('props should contain "contentHolderItem" object with "uniquePrefix" equel to "topic-array-with-forum-id-1"',() => {
    expect(setup().prop('contentHolderItem').uniquePrefix).toEqual('topic-array-with-forum-id-1');
  });

  it('props should contain "contentHolderItem" object with ' +
     '"titleElement.type.displayName" equel to "Connect(TermItem)", with ' +
     '"titleElement.props.term" equel to "Topics"',() => {
    const titleElement = setup().prop('contentHolderItem').titleElement;
    expect(titleElement.type.displayName).toEqual('Connect(TermItem)');
    expect(titleElement.props.term).toEqual({id: 23, value: 'Topics'});
  });

  it('props should contain "contentHolderItem" object with ' +
     '"bodyContent.length" equel to "3", with ' +
     '"bodyContent[0].type.name" equel to "TopicItem"',() => {
    const bodyContent = setup().prop('contentHolderItem').bodyContent;
    expect(bodyContent.length).toEqual(3);
    expect(bodyContent[0].type.name).toEqual('TopicItem');
  });

  it('props should contain "contentHolderItem" object with ' +
     '"firstColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"firstColumnTerm.props.term" equel to expected model',() => {
    const firstColumnTerm = setup().prop('contentHolderItem').firstColumnTerm;
    expect(firstColumnTerm.type.displayName).toEqual('Connect(TermItem)');
    expect(firstColumnTerm.props.term).toEqual({id: 2, value: 'Posts'});
  });

  it('props should contain "contentHolderItem" object with ' +
     '"secondColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"secondColumnTerm.props.term" equel to expected model',() => {
    const secondColumnTerm = setup().prop('contentHolderItem').secondColumnTerm;
    expect(secondColumnTerm.type.displayName).toEqual('Connect(TermItem)');
    expect(secondColumnTerm.props.term).toEqual({id: 22, value: 'Views'});
  });

  it('props should contain "contentHolderItem" object with ' +
     '"thirdColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"thirdColumnTerm.props.term" equel to expected model',() => {
    const thirdColumnTerm = setup().prop('contentHolderItem').thirdColumnTerm;
    expect(thirdColumnTerm.type.displayName).toEqual('Connect(TermItem)');
    expect(thirdColumnTerm.props.term).toEqual({id: 3, value: 'Last message in'});
  });
});
