import * as types from "./actionTypes";

function setTitleMainPart(mainPart) {
  return {
    type: types.SET_TITLE_MAIN_PART,
    mainPart: mainPart
  };
}

function setTitleActionPart(actionPart) {
  return {
    type: types.SET_TITLE_ACTION_PART,
    actionPart: actionPart
  };
}

function setTitleDescriptionPart(descriptionPart) {
  return {
    type: types.SET_TITLE_DESCRIPTION_PART,
    descriptionPart: descriptionPart
  };
}

export {
  setTitleMainPart,
  setTitleActionPart,
  setTitleDescriptionPart
};
