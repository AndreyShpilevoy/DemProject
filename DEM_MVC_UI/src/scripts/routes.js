import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './containers/Layout';
import MainConferencePage from './pages/MainConferencePage';
import ViewForumPage from './pages/ViewForumPage';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={MainConferencePage} />
    <Route path="/Conference" component={MainConferencePage}/>
    <Route path="/Conference/Forum/:forumId" component={ViewForumPage}/>
  </Route>
);
