import {combineReducers} from "redux";
import { routerReducer } from 'react-router-redux';
import forumReducer from "./forumReducer";
import chapterReducer from "./chapterReducer";
import navigationLinkReducer from "./navigationLinkReducer";

const rootReducer = combineReducers({
  forumReducer,
  chapterReducer,
  navigationLinkReducer,
  routing: routerReducer
});

export default rootReducer;
