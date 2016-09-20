import {combineReducers} from "redux";
import { routerReducer } from 'react-router-redux';
import forumReducer from "./forumReducer";
import chapterReducer from "./chapterReducer";
import localeReducer from "./localeReducer";
import navigationLinkReducer from "./navigationLinkReducer";

const rootReducer = combineReducers({
  forumReducer,
  chapterReducer,
  localeReducer,
  navigationLinkReducer,
  routing: routerReducer
});

export default rootReducer;
