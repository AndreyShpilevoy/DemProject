import React, {PropTypes} from 'react';

class ForumList extends React.Component {
  static propTypes = {
    forumList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        order: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        topicsCount: PropTypes.number.isRequired,
        postsCount: PropTypes.number.isRequired,
        lastActiveTopicId: PropTypes.number.isRequired,
        lastActiveTopic: PropTypes.string.isRequired,
        latesPostTimeCreation: PropTypes.instanceOf(Date),
        latesPostAutorId: PropTypes.number.isRequired,
        latesPostAutorName: PropTypes.string.isRequired,
        latesPostAutorGroupColor: PropTypes.string.isRequired,
        subforums: PropTypes.array,
      })).isRequired
  };

  render(){
    return(
      <div className="forums-container">
        forums contant {this.props.forumList.length}
      </div>
    );
  }
}

export default ForumList;
