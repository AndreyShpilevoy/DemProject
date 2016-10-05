/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import SocialMediaLinkList from "../SocialMediaLinkList";

describe('ChapterList', () => {
  function setup() {
    const props = {
      sociaMediaLinkList: [{
        id: 1,
        title: "ChapteItemId-1",
        href: "http://ChapteItemId-1",
        svgName: "ChapteItemId-svgName-1",
        order: 1,
      },
      {
        id: 3,
        title: "ChapteItemId-3",
        href: "http://ChapteItemId-3",
        svgName: "ChapteItemId-svgName-3",
        order: 3,
      },
      {
        id: 2,
        title: "ChapteItemId-2",
        href: "http://ChapteItemId-2",
        svgName: "ChapteItemId-svgName-2",
        order: 2,
      }]
    };

    return shallow(<SocialMediaLinkList {...props}/>);
  }

  it('should render top level div with className "social-media-link-wrapper"',() => {
    const divElement = setup().find('div').first();
    expect(divElement.hasClass("social-media-link-wrapper")).toBeTruthy();
  });

  it('child contains 3 SocialMediaLinkItem components',() => {
    const chapterItems = setup().find("SocialMediaLinkItem");
    expect(chapterItems.length).toEqual(3);
  });

  it('child SocialMediaLinkItem components should be ordered by order property',() => {
    let socialMediaLinkItemOrder = [];
    setup().find("SocialMediaLinkItem").forEach(function (node) {
      socialMediaLinkItemOrder.push(node.props().sociaMediaLinkItem.order);
    });
    expect(socialMediaLinkItemOrder).toEqual([ 1, 2, 3 ]);
  });
});
