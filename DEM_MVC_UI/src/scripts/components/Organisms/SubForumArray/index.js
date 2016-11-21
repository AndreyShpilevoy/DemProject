import React, {PropTypes} from 'react';
import _ from 'lodash';
import SubForumItem from 'Molecules/SubForumItem';
import styles from './index.scss';

class SubForumArray extends React.Component {
  static propTypes = {
    subForumArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
      }).isRequired
    ).isRequired
  };

  orderSubForumArray = () => {
    return  _.orderBy(this.props.subForumArray, 'order');
  }

  mapSubForumArray = () => {
    let mappedSubforums = this.orderSubForumArray().map(subForumItem =>
      <SubForumItem key={subForumItem.id} subForumItem={subForumItem} />);
        return mappedSubforums;
  }

  render(){
    let subForumItems = this.mapSubForumArray();
    return(
      <div className={styles.subForumsContainer}>
        {subForumItems}
      </div>
    );
  }
}

export default SubForumArray;
