import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import ForumsPage from './components/forums/ForumsPage';
import TopicsPage from './components/topics/TopicsPage';
import ManageeForumPage from "./components/forums/ManageeForumPage";

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={ForumsPage} />
    <Route path="forums" component={ForumsPage}/>
    <Route path="forum" component={ManageeForumPage}/>
    <Route path="forum/:id" component={ManageeForumPage}/>
    <Route path="topics" component={TopicsPage}/>
  </Route>
);
