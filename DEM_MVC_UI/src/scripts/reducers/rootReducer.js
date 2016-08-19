import {combineReducers} from "redux";
import { routerReducer } from 'react-router-redux';
import forumReducer from "./forumReducer";
import authorReducer from "./authorReducer";

const rootReducer = combineReducers({
  forumReducer,
  authorReducer,
  routing: routerReducer
});

export default rootReducer;
