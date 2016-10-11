import React, {PropTypes} from 'react';
import {ChapterItemById, TopicList} from '../containers/_all';

class ViewForumPage extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      forumId: PropTypes.number.isRequired
    }).isRequired
  };
  render() {
    return (
      <div>
        <ChapterItemById targetChapterId={this.props.params.forumId}/>
        <TopicList forumId={this.props.params.forumId}/>
      </div>
    );
  }
}

export default ViewForumPage;
