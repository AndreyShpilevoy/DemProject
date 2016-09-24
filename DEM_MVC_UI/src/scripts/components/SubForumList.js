import React, {PropTypes} from 'react';
import _ from 'lodash';
import {SubForumItem} from './_all';

class SubForumList extends React.Component {
  static propTypes = {
    subForums: PropTypes.arrayof(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
      }).isRequired
    ).isRequired
  };

  sortSubforums = () => {
    return  _.sortBy(this.props.subForums, "order");
  }

  mapSubforums = () => {
    let mappedSubforums = this.sortSubforums().map(subForumItem =>
      <SubForumItem key={subForumItem.id} subForumItem={subForumItem} />);
        return mappedSubforums;
  }

  render(){
    let subForumItems = this.mapSubforums();
    return(
      <div className="sub-forum-list-container">
        {subForumItems}
      </div>
    );
  }
}

export default SubForumList;
