import React, {PropTypes} from 'react';
import ChapterItemById from '../containers/ChapterItemById';
import TopicArray from '../containers/TopicArray';

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
        <TopicArray forumId={this.props.params.forumId}/>
      </div>
    );
  }
}

export default ViewForumPage;
