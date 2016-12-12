import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from 'containers/Layout';
import PageMainConference from 'containers/Page_MainConference';
import PageViewForum from 'containers/Page_ViewForum';
import PageViewTopic from 'containers/Page_ViewTopic';

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={PageMainConference} />
    <Route path='/Conference' component={PageMainConference}/>
    <Route path='/Conference/Forum/:forumId' component={PageViewForum}/>
    <Route path='/Conference/Topic/:topicId' component={PageViewTopic}/>
  </Route>
);
