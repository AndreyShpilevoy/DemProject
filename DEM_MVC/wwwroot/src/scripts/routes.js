import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import ForumsPage from './components/forums/ForumsPage';
import TopicsPage from './components/topics/TopicsPage';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={ForumsPage} />
    <Route path="forums" component={ForumsPage}/>
    <Route path="topics" component={TopicsPage}/>
  </Route>
);
