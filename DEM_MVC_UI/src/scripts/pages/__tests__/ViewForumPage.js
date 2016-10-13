/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import ViewForumPage from "../ViewForumPage";

describe('ViewForumPage', () => {
  function setup() {
    let props={
      params: {
        forumId: 1
      }
    };
    return shallow(<ViewForumPage {...props}/>);
  }

  it('should render "div"',() => {
    const divElement = setup().find('div').first();
    expect(divElement).toBeTruthy();
  });

  it('should contain 3 ChapterItemById element',() => {
    const ChapterItemByIdElement = setup().find('Connect(ChapterItemById)');
    expect(ChapterItemByIdElement.length).toEqual(1);
  });

  it('should contain 3 TopicList element',() => {
    const TopicListElement = setup().find('Connect(TopicList)');
    expect(TopicListElement.length).toEqual(1);
  });

  it('Connect(TopicList) props.forumId should be equel 1',() => {
    const TopicListElement = setup().find('Connect(TopicList)');
    expect(TopicListElement.props().forumId).toEqual(1);
  });

  it('Connect(ChapterItemById) props.targetChapterId should be equel 1',() => {
    const ChapterItemByIdElement = setup().find('Connect(ChapterItemById)');
    expect(ChapterItemByIdElement.props().targetChapterId).toEqual(1);
  });
});
