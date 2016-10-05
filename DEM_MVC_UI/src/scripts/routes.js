import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Layout } from './containers/_all';
import { MainConferencePage, ChapterItemByIdPage } from './pages/_all';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={MainConferencePage} />
    <Route path="/Conference" component={MainConferencePage}/>
    <Route path="/Conference/:chapterId" component={ChapterItemByIdPage}/>
  </Route>
);
