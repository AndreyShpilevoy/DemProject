import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/common/Layout';
import ForumsPage from './components/forums/ForumsPage';
import TopicsPage from './components/topics/TopicsPage';
import ManageForumPage from "./components/forums/ManageForumPage";

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={ForumsPage} />
    <Route path="forums" component={ForumsPage}/>
    <Route path="forum" component={ManageForumPage}/>
    <Route path="forum/:id" component={ManageForumPage}/>
    <Route path="topics" component={TopicsPage}/>
  </Route>
);
