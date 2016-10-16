import {combineReducers} from "redux";
import { routerReducer } from 'react-router-redux';
import forumReducer from "./forumReducer";
import topicReducer from "./topicReducer";
import lastActiveTopicReducer from "./lastActiveTopicReducer";
import chapterReducer from "./chapterReducer";
import localeReducer from "./localeReducer";
import navigationLinkReducer from "./navigationLinkReducer";
import socialMediaLinkReducer from "./socialMediaLinkReducer";
import notificationReducer from "./notificationReducer";
import titleReducer from "./titleReducer";

const rootReducer = combineReducers({
  forumReducer,
  topicReducer,
  chapterReducer,
  localeReducer,
  navigationLinkReducer,
  socialMediaLinkReducer,
  lastActiveTopicReducer,
  notificationReducer,
  titleReducer,
  routing: routerReducer
});

export default rootReducer;
