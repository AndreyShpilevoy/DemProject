import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Layout, ChapterList, ChapterByIdItem } from './containers/_all';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={ChapterList} />
    <Route path="/Conference" component={ChapterList}/>
    <Route path="/Conference/:id" component={ChapterByIdItem}/>
  </Route>
);
