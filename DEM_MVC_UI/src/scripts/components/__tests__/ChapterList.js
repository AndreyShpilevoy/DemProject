/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import ChapterList from "../ChapterList";

describe('ChapterList', () => {
  function setup() {
    const props = {
      chapterList: [{
        id: 1,
        title: "ChapteItemId-1",
        order: 1,
      },
      {
        id: 3,
        title: "ChapteItemId-3",
        order: 3,
      },
      {
        id: 2,
        title: "ChapteItemId-2",
        order: 2,
      }]
    };

    return shallow(<ChapterList {...props}/>);
  }

  it('should render top level div with className "page-content"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass("page-content")).toBeTruthy();
  });

  it('child contains 3 ChapterItem components',() => {
    const chapterItems = setup().find("ChapterItem");
    expect(chapterItems.length).toEqual(3);
  });

  it('child ChapterItem components should be sorted by order property',() => {
    let chapterItemOrder = [];
    setup().find("ChapterItem").forEach(function (node) {
      chapterItemOrder.push(node.props().chapterItem.order);
    });
    expect(chapterItemOrder).toEqual([ 1, 2, 3 ]);
  });
});
