/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import SocialMediaLinkListConnected, {SocialMediaLinkList} from "../SocialMediaLinkList";

const mockStore = configureMockStore();
const storeStateMock = {
  socialMediaLinkReducer:{
    socialMediaLinks: [
      {
        id: 1,
        title: 'Steam - Ex Machina Community',
        svgName: 'Steam',
        href: 'http://steamcommunity.com/groups/Ex_Machina',
        order: 1
      },
      {
        id: 2,
        title: 'VK - Ex Machina group',
        svgName: 'Vk',
        href: 'https://vk.com/exmachina2',
        order: 2
      }]
  }
};
const mockActions = {
  getSocialMediaLinks: function(){}
};


describe('SocialMediaLinkList', () => {
  function setup() {
    const props = {
      store: mockStore(storeStateMock),
      actions: mockActions
    };
    return shallow(<SocialMediaLinkList {...props}/>, { lifecycleExperimental: true });
  }

  function setupConnected() {
    const props = {
      store: mockStore(storeStateMock)
    };
    return shallow(<SocialMediaLinkListConnected {...props}/>);
  }

  it('should call "componentDidMount" once',() => {
    sinon.spy(SocialMediaLinkList.prototype, 'componentDidMount');
    setup();
    expect(SocialMediaLinkList.prototype.componentDidMount.calledOnce).toBeTruthy();
  });

  it('should get "allChapters" from "chapterReducer" and recieve expected result', () => {
    expect(setupConnected().prop('sociaMediaLinkList')).toEqual(storeStateMock.socialMediaLinkReducer.socialMediaLinks);
  });
});
