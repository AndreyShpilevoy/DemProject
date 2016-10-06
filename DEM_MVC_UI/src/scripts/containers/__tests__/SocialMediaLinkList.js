/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import {SocialMediaLinkList} from "../_all";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";

describe('SocialMediaLinkList', () => {
  function setup() {
    const props = {
      store: sharedFakeStore(),
      actions: mockActions
    };
    return shallow(<SocialMediaLinkList {...props}/>, { lifecycleExperimental: true });
  }

  it('should get "allChapters" from "chapterReducer" and recieve expected result', () => {
    expect(setup().prop('sociaMediaLinkList')).toEqual(sharedFakeStoreData.socialMediaLinkReducer.socialMediaLinks);
  });

  it('should find "SocialMediaLinkListComponent" component', () => {
    const divElement = setup().shallow();
    expect(divElement.find("SocialMediaLinkListComponent")).toBeTruthy();
  });
});
