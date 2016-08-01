import {combineReducers} from "redux";
import forumReducer from "./forumReducer";
import authorReducer from "./authorReducer";

const rootReducer = combineReducers({
  forumReducer,
  authorReducer
});

export default rootReducer;
