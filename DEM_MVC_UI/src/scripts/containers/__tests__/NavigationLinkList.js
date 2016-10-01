/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import NavigationLinkList from "../NavigationLinkList";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

describe('NavigationLinkList', () => {
  function setup() {
    const props = {
      store: sharedFakeStore(),
      actions: mockActions
    };
    return shallow(<NavigationLinkList {...props}/>, { lifecycleExperimental: true });
  }

  it('should call "componentDidMount" once',() => {
    sinon.spy(NavigationLinkList.prototype, 'componentDidMount');
    setup().shallow({ lifecycleExperimental: true });
    expect(NavigationLinkList.prototype.componentDidMount.calledOnce).toBeTruthy();
  });

  it('should get "navigationLinks" from "navigationLinkReducer" and recieve expected result', () => {
    expect(setup().prop('navigationLinkList')).toEqual(sharedFakeStoreData.navigationLinkReducer.navigationLinks);
  });
});
