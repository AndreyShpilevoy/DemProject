/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import posts from 'api/__fakeData__/posts';
import PostArray from './index';

describe('PostArray', () => {
  function setup() {
    const props = {
      topicId: 1,
      postArray: [posts[2], posts[0], posts[1]]
    };

    return shallow(<PostArray {...props}/>);
  }

  it('should render ContentHolder',() => {
    const contentHolderElement = setup().find('ContentHolder').first();
    expect(contentHolderElement.node.type.name).toEqual('ContentHolder');
  });


  it('props should contain "contentHolderItem" object with "uniquePrefix" equel to "post-array-with-topic-id-1"',() => {
    expect(setup().prop('contentHolderItem').uniquePrefix).toEqual('post-array-with-topic-id-1');
  });

  it('props should contain "contentHolderItem" object with ' +
     '"titleElement.type.displayName" equel to "Connect(TermItem)", with ' +
     '"titleElement.props.term" equel to "Posts"',() => {
    const titleElement = setup().prop('contentHolderItem').titleElement;
    expect(titleElement.type.displayName).toEqual('Connect(TermItem)');
    expect(titleElement.props.term).toEqual({id: 30, value: 'Posts'});
  });

  it('props should contain "contentHolderItem" object with ' +
     '"bodyContent.length" equel to "3", with ' +
     '"bodyContent.type.name" equel to "PostItem"',() => {
    const bodyContent = setup().prop('contentHolderItem').bodyContent;
    expect(bodyContent.length).toEqual(3);
    expect(bodyContent[0].type.name).toEqual('PostItem');
  });
});
