import React from 'react';
import LastActiveTopicsList from '../containers/LastActiveTopicsList';
import ChapterList from '../containers/ChapterList';

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
