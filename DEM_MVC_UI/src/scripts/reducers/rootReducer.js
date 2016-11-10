import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import forumReducer from 'reducers/forumReducer';
import topicReducer from 'reducers/topicReducer';
import postReducer from 'reducers/postReducer';
import lastActiveTopicReducer from 'reducers/lastActiveTopicReducer';
import chapterReducer from 'reducers/chapterReducer';
import localeReducer from 'reducers/localeReducer';
import navigationLinkReducer from 'reducers/navigationLinkReducer';
import socialMediaLinkReducer from 'reducers/socialMediaLinkReducer';
import notificationReducer from 'reducers/notificationReducer';
import breadcrumbsReducer from 'reducers/breadcrumbsReducer';

const rootReducer = combineReducers({
  forumReducer,
  topicReducer,
  postReducer,
  chapterReducer,
  localeReducer,
  navigationLinkReducer,
  socialMediaLinkReducer,
  lastActiveTopicReducer,
  notificationReducer,
  breadcrumbsReducer,
  routing: routerReducer
});

export default rootReducer;
