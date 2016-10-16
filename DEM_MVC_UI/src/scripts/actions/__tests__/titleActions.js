/*eslint no-undef: "off"*/

import * as types from "../actionTypes";
import * as titleActions from "../titleActions";


describe('titleActions', () => {
  it('should create an action with expected mainPart', () => {
    const mainPart = "mainPart";
    const expectedAction = {
      type: types.SET_TITLE_MAIN_PART,
      mainPart
    };
    expect(titleActions.setTitleMainPart(mainPart)).toEqual(expectedAction);
  });

  it('should create an action with expected actionPart', () => {
    const actionPart = "actionPart";
    const expectedAction = {
      type: types.SET_TITLE_ACTION_PART,
      actionPart
    };
    expect(titleActions.setTitleActionPart(actionPart)).toEqual(expectedAction);
  });

  it('should create an action with expected descriptionPart', () => {
    const descriptionPart = "descriptionPart";
    const expectedAction = {
      type: types.SET_TITLE_DESCRIPTION_PART,
      descriptionPart
    };
    expect(titleActions.setTitleDescriptionPart(descriptionPart)).toEqual(expectedAction);
  });
});
