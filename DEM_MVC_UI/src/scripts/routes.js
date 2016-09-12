import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import { ConferencePage } from './containers/_all';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={ConferencePage} />
    <Route path="Conference" component={ConferencePage}/>
  </Route>
);
