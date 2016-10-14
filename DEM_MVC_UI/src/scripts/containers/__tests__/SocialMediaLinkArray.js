/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import SocialMediaLinkArray from "../SocialMediaLinkArray";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

describe('SocialMediaLinkArray', () => {
  function setup() {
    const props = {
      store: sharedFakeStore(),
      actions: mockActions
    };
    return shallow(<SocialMediaLinkArray {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "allChapters" from "chapterReducer" and recieve expected result', () => {
    expect(setup().prop('socialMediaLinkArray')).toEqual(sharedFakeStoreData.socialMediaLinkReducer.socialMediaLinks);
  });

  it('should find "SocialMediaLinkArrayComponent" component', () => {
    const divElement = setup().shallow();
    expect(divElement.find("SocialMediaLinkArrayComponent")).toBeTruthy();
  });
});
