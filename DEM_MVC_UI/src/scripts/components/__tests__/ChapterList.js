/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import {ChapterList} from "../_all";
import {chapters} from "../../api/__fakeData__/_all";

describe('ChapterList', () => {
  function setup() {
    const props = {
      chapterList: [chapters[0], chapters[1], chapters[2]]
    };

    return shallow(<ChapterList {...props}/>);
  }

  it('should render top level div',() => {
    expect(setup().find('div').first()).toBeTruthy();
  });

  it('child contains 3 ChapterItem components',() => {
    const chapterItems = setup().find("ChapterItem");
    expect(chapterItems.length).toEqual(3);
  });

  it('child ChapterItem components should be ordered by order property',() => {
    let chapterItemOrder = [];
    setup().find("ChapterItem").forEach(function (node) {
      chapterItemOrder.push(node.props().chapterItem.order);
    });
    expect(chapterItemOrder).toEqual([ 1, 2, 3 ]);
  });
});
