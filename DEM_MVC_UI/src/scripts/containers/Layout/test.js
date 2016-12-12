/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import * as mockActions from 'actions/__mocks__/sharedFakeActions';
import {sharedFakeStore} from 'store/__mocks__/sharedFakeStore';
import Layout from './index';



describe('Layout', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions
    };
    return shallow(<Layout {...props}/>, { lifecycleExperimental: true });
  }

  it('should find "Layout" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find('Layout').node.type.name).toEqual('Layout');
  });
});
