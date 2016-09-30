/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import NavigationLinkListConnected, {NavigationLinkList} from "../NavigationLinkList";

const mockStore = configureMockStore();
const storeStateMock = {
  navigationLinkReducer:{
    navigationLinks: [
      {id: 1, title: 'Conference', href: '/', order: 1},
      {id: 3, title: 'Link 3 autogen', href: '/', order: 3},
      {id: 2, title: 'Link 2 autogen', href: '/', order: 2}
    ]
  }
};
const mockActions = {
  getNavigationLinks: function(){}
};


describe('NavigationLinkList', () => {
  function setup() {
    const props = {
      store: mockStore(storeStateMock),
      actions: mockActions
    };
    return shallow(<NavigationLinkList {...props}/>, { lifecycleExperimental: true });
  }

  function setupConnected() {
    const props = {
      store: mockStore(storeStateMock)
    };
    return shallow(<NavigationLinkListConnected {...props}/>);
  }

  it('should call "componentDidMount" once',() => {
    sinon.spy(NavigationLinkList.prototype, 'componentDidMount');
    setup();
    expect(NavigationLinkList.prototype.componentDidMount.calledOnce).toBeTruthy();
  });

  it('should get "navigationLinks" from "navigationLinkReducer" and recieve expected result', () => {
    expect(setupConnected().prop('navigationLinkList')).toEqual(storeStateMock.navigationLinkReducer.navigationLinks);
  });
});
