/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import TopicItem from "../TopicItem";

describe('TopicItem', () => {
  function setup(hasAvatar) {
    const props = {
      topicItem: {
          id: 1,
          title: "Как деактивировать бомбу",
          postsCount: 215,
          topicViewsCount: 1315,
          latesPostTimeCreation: new Date("2016/09/19 13:42:32"),
          latesPostAutorId: 4,
          latesPostAutorName: "kto",
          latesPostAutorAvatart: hasAvatar ? "http://i70.fastpic.ru/big/2015/0628/36/ccbb1e2cb8ba8dbd379a6a12dc6b8336.jpg" : undefined,
          latesPostAutorGroupColor: "ffa510"
      }
    };

    return shallow(<TopicItem {...props}/>);
  }

  it('should render top level div with className "topic-container-wrapper"',() => {
    const divElement = setup(true).find('div').first();
    expect(divElement.hasClass("topic-container-wrapper")).toBeTruthy();
  });

  it('should contain 2 TermItem element',() => {
    const termItemElement = setup(true).find('Connect(TermItem)');
    expect(termItemElement.length).toEqual(2);
  });

  it('should contain 1 RelativeDateTime element',() => {
    const relativeDateTimeElement = setup().find('Connect(RelativeDateTime)');
    expect(relativeDateTimeElement.length).toEqual(1);
  });

  it('should contain 3 Link element if user has avatar',() => {
    const linkElement = setup(true).find('Link');
    expect(linkElement.length).toEqual(3);
  });

  it('should contain 2 Link element if user has no avatar',() => {
    const linkElement = setup(false).find('Link');
    expect(linkElement.length).toEqual(2);
  });

  it('should have default state',() => {
    const expectedState = {
      latesPostAutorNameStyle: {
        color: "#ffa510"
      }
    };

    const stateElement = setup(true).state();
    expect(stateElement).toEqual(expectedState);
  });
});
