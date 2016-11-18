import React, {PropTypes} from 'react';
import _ from 'lodash';
import ForumItem from 'oldComponents/ForumItem';

class ForumArray extends React.Component {
  static propTypes = {
    forumArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        order: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        topicsCount: PropTypes.number.isRequired,
        postsCount: PropTypes.number.isRequired,
        lastTopicInfo: PropTypes.shape({
          lastActiveTopicId: PropTypes.number.isRequired,
          lastActiveTopic: PropTypes.string.isRequired,
          latesPostTimeCreation: PropTypes.instanceOf(Date),
          latesPostAutorId: PropTypes.number.isRequired,
          latesPostAutorName: PropTypes.string.isRequired,
          latesPostAutorGroupColor: PropTypes.string.isRequired,
        }).isRequired,
        subforums: PropTypes.array,
      })).isRequired
  };

  orderForums = () => {
    return  _.orderBy(this.props.forumArray, 'order');
  }

  mapForums = () => {
    let mappedForums = this.orderForums().map(forumItem =>
      <ForumItem key={forumItem.id} forumItem={forumItem} />);
        return mappedForums;
  }

  render(){
    let forumItems = this.mapForums();
    return(
      <div className="forums-container">
        {forumItems}
      </div>
    );
  }
}

export default ForumArray;
