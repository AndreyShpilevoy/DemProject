/*eslint no-undef: "off"*/
/* eslint import/no-extraneous-dependencies: "off" */

import React from 'react';
import {shallow} from 'enzyme';
import Title from "../Title";
import * as mockActions from "../../actions/__mocks__/sharedFakeActions";
import {sharedFakeStore, sharedFakeStoreData} from "../../store/__mocks__/sharedFakeStore";


describe('Title', () => {
  function setup(valid) {
    const props = {
      store: sharedFakeStore(valid),
      actions: mockActions
    };
    return shallow(<Title {...props}/>, { lifecycleExperimental: true });
  }

    it('Should render empty element without errors', () => {
      expect(setup(true).shallow().node).toBeFalsy();
    });

    it('Should return "Title" with expected props', () => {
      expect(setup(true).prop("mainPart")).toEqual(sharedFakeStoreData.titleReducer.mainPart);
      expect(setup(true).prop("actionPart")).toEqual(sharedFakeStoreData.titleReducer.actionPart);
      expect(setup(true).prop("descriptionPart")).toEqual(sharedFakeStoreData.titleReducer.descriptionPart);
    });

    it('Should return "Title" with empty props', () => {
      expect(setup(false).prop("mainPart")).toBeFalsy();
      expect(setup(false).prop("actionPart")).toBeFalsy();
      expect(setup(false).prop("descriptionPart")).toBeFalsy();
    });
});
