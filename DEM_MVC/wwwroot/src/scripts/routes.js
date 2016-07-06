import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './Components/Layout';
import ForumsPage from './Components/Forums/ForumsPage';
import TopicsPage from './Components/Topics/TopicsPage';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={ForumsPage} />
    <Route path="forums" component={ForumsPage}/>
    <Route path="topics" component={TopicsPage}/>
  </Route>
);
