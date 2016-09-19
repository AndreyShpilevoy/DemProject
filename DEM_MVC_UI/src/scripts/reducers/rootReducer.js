import {combineReducers} from "redux";
import { routerReducer } from 'react-router-redux';
import forumReducer from "./forumReducer";
import chapterReducer from "./chapterReducer";
import navigationLinkReducer from "./navigationLinkReducer";
import termTranslationReducer from "./termTranslationReducer";

const rootReducer = combineReducers({
  forumReducer,
  chapterReducer,
  navigationLinkReducer,
  termTranslationReducer,
  routing: routerReducer
});

export default rootReducer;
