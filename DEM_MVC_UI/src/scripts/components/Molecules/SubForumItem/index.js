import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {RightAngle} from 'Molecules/SvgImageMapper';
import commonStyles from 'commonScss/common.scss';
import styles from './index.scss';

class SubForumItem extends React.Component {
  static propTypes = {
    subForumItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired
    }).isRequired
  };

  render(){
    let {id, title} = this.props.subForumItem;
    return(
      <div className={commonStyles.flexRow}>
        <RightAngle className={styles.subForumIcon} />
        <Link className={styles.subForumLink} to={`/Conference/Forum/${id}`}>
          {title}
        </Link>
      </div>
    );
  }
}

export default SubForumItem;
