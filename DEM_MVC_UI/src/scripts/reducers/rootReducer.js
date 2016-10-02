import {combineReducers} from "redux";
import { routerReducer } from 'react-router-redux';
import forumReducer from "./forumReducer";
import topicReducer from "./topicReducer";
import chapterReducer from "./chapterReducer";
import localeReducer from "./localeReducer";
import navigationLinkReducer from "./navigationLinkReducer";
import socialMediaLinkReducer from "./socialMediaLinkReducer";

const rootReducer = combineReducers({
  forumReducer,
  topicReducer,
  chapterReducer,
  localeReducer,
  navigationLinkReducer,
  socialMediaLinkReducer,
  routing: routerReducer
});

export default rootReducer;
