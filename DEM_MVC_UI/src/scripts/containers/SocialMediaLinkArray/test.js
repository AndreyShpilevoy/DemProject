/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import * as mockActions from 'actions/__mocks__/sharedFakeActions';
import {sharedFakeStore, validFakeStoreData} from 'store/__mocks__/sharedFakeStore';
import SocialMediaLinkArray from './index';

describe('SocialMediaLinkArray', () => {
  function setup(mockConfigId) {
    const props = {
      store: sharedFakeStore(mockConfigId),
      actions: mockActions
    };
    return shallow(<SocialMediaLinkArray {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "allChapters" from "chapterReducer" and recieve expected result', () => {
    expect(setup(1).prop('socialMediaLinkArray')).toEqual(validFakeStoreData.socialMediaLinkReducer.socialMediaLinks);
  });

  it('should find "SocialMediaLinkArray" component', () => {
    const divElement = setup(1).shallow();
    expect(divElement.find('SocialMediaLinkArray').node.type.name).toEqual('SocialMediaLinkArray');
  });
});
