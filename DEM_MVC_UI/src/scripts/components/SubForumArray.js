import React, {PropTypes} from 'react';
import _ from 'lodash';
import SubForumItem from './SubForumItem';

class SubForumArray extends React.Component {
  static propTypes = {
    subForumArray: PropTypes.arrayof(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
      }).isRequired
    ).isRequired
  };

  orderSubForumArray = () => {
    return  _.orderBy(this.props.subForumArray, "order");
  }

  mapSubForumArray = () => {
    let mappedSubforums = this.orderSubForumArray().map(subForumItem =>
      <SubForumItem key={subForumItem.id} subForumItem={subForumItem} />);
        return mappedSubforums;
  }

  render(){
    let subForumItems = this.mapSubForumArray();
    return(
      <div className="sub-forum-array-container">
        {subForumItems}
      </div>
    );
  }
}

export default SubForumArray;
