import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import { ChaptersPage } from './containers/_all';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={ChaptersPage} />
    <Route path="Conference" component={ChaptersPage}/>
  </Route>
);
