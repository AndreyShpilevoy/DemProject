import React from 'react';
import {ChapterList, LastActiveTopicsList} from '../containers/_all';

class MainConferencePage extends React.Component {
  render() {
    return (
      <div>
        <LastActiveTopicsList />
        <ChapterList />
      </div>
    );
  }
}

export default MainConferencePage;
