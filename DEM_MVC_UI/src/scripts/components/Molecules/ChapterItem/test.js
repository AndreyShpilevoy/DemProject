/*eslint no-undef: 'off'*/
/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import {shallow} from 'enzyme';
import chapters from 'api/__fakeData__/chapters';
import ChapterItem from './index';

describe('ChapterItem', () => {
  function setup(valid) {
    const props = {
      chapterItem: valid ? chapters[0] : {}
    };

    return shallow(<ChapterItem {...props}/>);
  }

  it('should render ContentHolder',() => {
    const contentHolderElement = setup(true).find('ContentHolder').first();
    expect(contentHolderElement.node.type.name).toEqual('ContentHolder');
  });

  it('props should contain "contentHolderItem" object with "Id" equel to 1',() => {
    expect(setup(true).prop('contentHolderItem').uniquePrefix).toEqual('chapter-item-with-id-1');
  });

  it('props should contain "contentHolderItem" object with ' +
     '"titleElement.type.displayName" equel to "Link", with ' +
     '"titleElement.props.to" equel to "/Conference/Forum/1"',() => {
    const titleElement = setup(true).prop('contentHolderItem').titleElement;
    expect(titleElement.type.displayName).toEqual('Link');
    expect(titleElement.props.to).toEqual('/Conference/Forum/1');
  });

  it('props should contain "contentHolderItem" object with ' +
     '"bodyContent.type.displayName" equel to "Connect(ForumArray)", with ' +
     '"bodyContent.props.chapterId" equel to "1"',() => {
    const bodyContent = setup(true).prop('contentHolderItem').bodyContent;
    expect(bodyContent.type.displayName).toEqual('Connect(ForumArray)');
    expect(bodyContent.props.chapterId).toEqual(1);
  });

  it('props should contain "contentHolderItem" object with ' +
     '"firstColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"firstColumnTerm.props.term" equel to expected model',() => {
    const firstColumnTerm = setup(true).prop('contentHolderItem').firstColumnTerm;
    expect(firstColumnTerm.type.displayName).toEqual('Connect(TermItem)');
    expect(firstColumnTerm.props.term).toEqual({id: 1, value: 'Topics'});
  });

  it('props should contain "contentHolderItem" object with ' +
     '"secondColumnTerm.type.displayName" equel to "Connect(TermItem)", with ' +
     '"secondColumnTerm.props.term" equel to expected model',() => {
    const secondColumnTerm = setup(true).prop('contentHolderItem').secondColumnTerm;
    expect(secondColumnTerm.type.displayName).toEqual('Connect(TermItem)');
    expect(secondColumnTerm.props.term).toEqual({id: 2, value: 'Posts'});
  });

  it('props should return null if ',() => {
    expect(setup(false).props()).toEqual({});
  });
});
