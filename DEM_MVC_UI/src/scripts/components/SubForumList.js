import React, {PropTypes} from 'react';
import _ from 'lodash';
import SubForumItem from './SubForumItem';

class SubForumList extends React.Component {
  static propTypes = {
    subForumList: PropTypes.arrayof(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
      }).isRequired
    ).isRequired
  };

  orderSubForumList = () => {
    return  _.orderBy(this.props.subForumList, "order");
  }

  mapSubForumList = () => {
    let mappedSubforums = this.orderSubForumList().map(subForumItem =>
      <SubForumItem key={subForumItem.id} subForumItem={subForumItem} />);
        return mappedSubforums;
  }

  render(){
    let subForumItems = this.mapSubForumList();
    return(
      <div className="sub-forum-list-container">
        {subForumItems}
      </div>
    );
  }
}

export default SubForumList;
