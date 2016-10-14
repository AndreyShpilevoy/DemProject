import React from 'react';
import LastActiveTopicsArray from '../containers/LastActiveTopicsArray';
import ChapterArray from '../containers/ChapterArray';

class MainConferencePage extends React.Component {
  render() {
    return (
      <div>
        <LastActiveTopicsArray />
        <ChapterArray />
      </div>
    );
  }
}

export default MainConferencePage;
