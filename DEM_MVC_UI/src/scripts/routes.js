import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import { ForumsPage, ManageForumPage } from './containers/_all';
import { TopicsPage } from './components/_all';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={ForumsPage} />
    <Route path="forums" component={ForumsPage}/>
    <Route path="forum" component={ManageForumPage}/>
    <Route path="forum/:id" component={ManageForumPage}/>
    <Route path="topics" component={TopicsPage}/>
  </Route>
);
