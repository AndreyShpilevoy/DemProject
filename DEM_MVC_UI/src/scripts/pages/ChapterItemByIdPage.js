import React, {PropTypes} from 'react';
import {ChapterItemById, TopicList} from '../containers/_all';

class ChapterItemByIdPage extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      chapterId: PropTypes.number.isRequired
    }).isRequired
  };
  render() {
    return (
      <div>
        <ChapterItemById targetChapterId={this.props.params.chapterId}/>
        <TopicList forumId={this.props.params.chapterId}/>
      </div>
    );
  }
}

export default ChapterItemByIdPage;
