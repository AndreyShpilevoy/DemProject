import React, {PropTypes} from 'react';
import _ from 'lodash';
import {ForumItem} from './_all.js';

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

  sortForums = () => {
    return  _.sortBy(this.props.forumList, "order");
  }

  mapForums = () => {
    let mappedForums = this.sortForums().map(forumItem =>
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

export default ForumList;
